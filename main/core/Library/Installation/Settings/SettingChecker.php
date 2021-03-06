<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Library\Installation\Settings;

class SettingChecker
{
    const REQUIRED_PHP_VERSION = '7.2';

    private $categories = [];

    public function __construct()
    {
        $this->checkPhpVersion();
        $this->checkPhpConfiguration();
        $this->checkPhpExtensions();
        $this->checkFilePermissions();
    }

    public function getSettingCategories()
    {
        return $this->categories;
    }

    public function hasFailedRecommendation()
    {
        foreach ($this->categories as $category) {
            if ($category->hasFailedRecommendation()) {
                return true;
            }
        }

        return false;
    }

    public function hasFailedRequirement()
    {
        foreach ($this->categories as $category) {
            if ($category->hasFailedRequirement()) {
                return true;
            }
        }

        return false;
    }

    private function checkPhpVersion()
    {
        $category = new SettingCategory('PHP version');
        $phpVersion = phpversion();
        $category->addRequirement(
            'PHP version must be at least %version% (installed version is %installed_version%)',
            ['version' => self::REQUIRED_PHP_VERSION, 'installed_version' => $phpVersion],
            version_compare($phpVersion, self::REQUIRED_PHP_VERSION, '>=')
        );

        $this->categories[] = $category;
    }

    private function checkPhpConfiguration()
    {
        $category = new SettingCategory('PHP configuration');

        $timezone = ini_get('date.timezone');
        $category->addRequirement(
            'Parameter date.timezone must be set in your php.ini',
            [],
            false != $timezone // loose comparison is required
        );

        if (version_compare(phpversion(), self::REQUIRED_PHP_VERSION, '>=')) {
            $supportedTimezones = [];

            foreach (\DateTimeZone::listAbbreviations() as $abbreviations) {
                foreach ($abbreviations as $abbreviation) {
                    $supportedTimezones[] = $abbreviation['timezone_id'];
                }
            }

            $category->addRequirement(
                'Your default timezone (%timezone%) is not supported',
                ['timezone' => $timezone],
                in_array($timezone, $supportedTimezones)
            );
        }

        $category->addRequirement(
            'Parameter %parameter% must be set to %value% in your php.ini',
            ['parameter' => 'detect_unicode', 'value' => 'false'],
            false === ini_get('detect_unicode')
        );

        $category->addRequirement(
            'Parameter %parameter% should be equal or greater than %value% in your php.ini',
            ['parameter' => 'max_execution_time', 'value' => 60],
            (ini_get('max_execution_time') >= 60 || 0 == ini_get('max_execution_time')) ? true : false
        );

        $category->addRecommendation(
            'Parameter %parameter% should be equal or greater than %value% in your php.ini',
            ['parameter' => 'memory_limit', 'value' => '256M'],
            $this->isGreaterOrEqual(ini_get('memory_limit'), '256M')
        );

        $recommendedSettings = [
            'short_open_tag' => false,
            'magic_quotes_gpc' => false,
            'register_globals' => false,
            'session.auto_start' => false,
            'file_uploads' => true,
        ];

        foreach ($recommendedSettings as $parameter => $value) {
            $category->addRecommendation(
                'Parameter %parameter% should be set to %value% in your php.ini',
                ['parameter' => $parameter, 'value' => $value ? 'true' : 'false'],
                $value == ini_get($parameter)
            );
        }

        $this->categories[] = $category;
    }

    private function checkPhpExtensions()
    {
        $category = new SettingCategory('PHP extensions');
        $requiredExtensions = [
            'JSON' => function_exists('json_encode'),
            'session' => function_exists('session_start'),
            'ctype' => function_exists('ctype_alpha'),
            'Tokenizer' => function_exists('token_get_all'),
            'SimpleXML' => function_exists('simplexml_import_dom'),
            'PCRE 8.0+' => defined('PCRE_VERSION'),
            'iconv' => function_exists('iconv'),
            'PHP-XML' => class_exists('DomDocument'),
            'fileinfo' => extension_loaded('fileinfo'),
            'PDO' => class_exists('PDO'),
            'curl' => function_exists('curl_exec'),
            'intl' => defined('INTL_ICU_VERSION'),
        ];

        foreach ($requiredExtensions as $extension => $isEnabled) {
            $category->addRequirement(
                'Extension %extension% must be installed and enabled',
                ['extension' => $extension],
                $isEnabled
            );
        }

        if (class_exists('PDO')) {
            $drivers = \PDO::getAvailableDrivers();
            $category->addRequirement(
                'PDO must have some drivers installed (i.e. for MySQL, PostgreSQL, etc.)',
                [],
                count($drivers) > 0
            );
        }

        $recommendedExtensions = [
            'mbstring' => function_exists('mb_strlen'),
            'XML' => function_exists('utf8_decode'),
            'gd' => extension_loaded('gd'),
            'ffmpeg' => extension_loaded('ffmpeg'),
        ];

        foreach ($recommendedExtensions as $extension => $isEnabled) {
            $category->addRecommendation(
                'Extension %extension% should be installed and enabled',
                ['extension' => $extension],
                $isEnabled
            );
        }

        $hasOpCodeCache =
            extension_loaded('eaccelerator') && ini_get('eaccelerator.enable') ||
            extension_loaded('apc') && ini_get('apc.enabled') ||
            extension_loaded('Zend Optimizer+') && ini_get('zend_optimizerplus.enable') ||
            extension_loaded('Zend OPcache') && ini_get('opcache.enable') ||
            extension_loaded('xcache') && ini_get('xcache.cacher') ||
            extension_loaded('wincache') && ini_get('wincache.ocenabled');
        $category->addRecommendation(
            'A PHP accelerator (like APC or XCache) should be installed and enabled (highly recommended)',
            [],
            $hasOpCodeCache
        );

        if (function_exists('apc_store') && ini_get('apc.enabled')) {
            $minimalApcVersion = version_compare(phpversion(), '5.4.0', '>=') ? '3.1.13' : '3.0.17';
            $category->addRequirement(
                'APC version must be at least %version%',
                ['version' => $minimalApcVersion],
                version_compare(phpversion('apc'), $minimalApcVersion, '>=')
            );
        }

        if (extension_loaded('xdebug')) {
            $category->addRecommendation(
                'Extension %extension% should not be enabled',
                ['extension' => 'xdebug'],
                false
            );
            $category->addRecommendation(
                'Parameter %parameter% should be above 100 in php.ini',
                ['parameter' => 'xdebug.max_nesting_level'],
                ini_get('xdebug.max_nesting_level') > 100
            );
        }

        $this->categories[] = $category;
    }

    private function checkFilePermissions()
    {
        $category = new SettingCategory('File permissions');
        $rootDir = __DIR__.'/../../../../../../../../';
        $writableElements = [
            'var/cache' => 'directory',
            'var/sessions' => 'directory',
            'config' => 'directory',
            'config/parameters.yml' => 'file',
            'var/log' => 'directory',
            'files' => 'directory',
            'files/config' => 'directory',
            'files/config/bundles.ini' => 'file',
            'files/config/platform_options.json' => 'file',
            'files/config/white_list_ip_range.yml' => 'file',
            'files/config/ip_white_list.yml' => 'file',
            'files/templates' => 'directory',
            'public' => 'directory',
            'public/uploads' => 'directory',
            'public/js' => 'directory',
        ];

        foreach ($writableElements as $element => $type) {
            $category->addRequirement(
                "The {$type} %{$type}% must be writable",
                [$type => $element],
                is_writable($rootDir.'/'.$element)
            );
        }

        $this->categories[] = $category;
    }

    private function isGreaterOrEqual($firstVal, $secondVal)
    {
        if ('-' === $firstVal[0]) {
            return true;
        }

        $toBytes = function ($val) {
            $val = trim($val);
            $last = strtolower($val[strlen($val) - 1]);

            switch ($last) {
                case 'g':
                    $val *= 1024;
                    // no break
                case 'm':
                    $val *= 1024;
                    // no break
                case 'k':
                    $val *= 1024;
            }

            return $val;
        };

        return $toBytes($firstVal) >= $toBytes($secondVal);
    }
}
