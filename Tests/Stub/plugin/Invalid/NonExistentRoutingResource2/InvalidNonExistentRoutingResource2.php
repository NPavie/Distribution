<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Invalid\NonExistentRoutingResource2;

use Claroline\CoreBundle\Library\PluginBundle;

class InvalidNonExistentRoutingResource2 extends PluginBundle
{
    public function getRoutingResourcesPaths()
    {
        $ds = DIRECTORY_SEPARATOR;
        $existent = __DIR__ . "{$ds}Resources{$ds}config{$ds}routing.yml";
        $nonExistent = __DIR__ . "{$ds}fake_routing.yml";

        return array($existent, $nonExistent);
    }
}
