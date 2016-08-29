<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\PdfPlayerBundle\Listener;

use Claroline\CoreBundle\Event\PlayFileEvent;
use Claroline\ScormBundle\Event\ExportScormResourceEvent;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;

class PdfPlayerListener extends ContainerAware
{
    public function onOpenPdf(PlayFileEvent $event)
    {
        $path = $this->container->getParameter('claroline.param.files_directory')
            .DIRECTORY_SEPARATOR
            .$event->getResource()->getHashName();
        $content = $this->container->get('templating')->render(
            'ClarolinePdfPlayerBundle::pdf.html.twig',
            array(
                'path' => $path,
                'pdf' => $event->getResource(),
                '_resource' => $event->getResource(),
            )
        );
        $response = new Response($content);
        $event->setResponse($response);
        $event->stopPropagation();
    }

    public function onExportScorm(ExportScormResourceEvent $event)
    {
        $template = $this->container->get('templating')->render(
            'ClarolinePdfPlayerBundle:Scorm:export.html.twig', [
                '_resource' => $event->getResource(),
            ]
        );

        // Set export template
        $event->setTemplate($template);

        // Add assets
        $webpack = $this->container->get('claroline.extension.webpack');
        $event->addAsset('commons.js', $webpack->hotAsset('dist/commons.js', true));
        $event->addAsset('claroline-distribution-plugin-pdf-player-pdf-viewer.js', $webpack->hotAsset('dist/claroline-distribution-plugin-pdf-player-pdf-viewer.js', true));

        $event->stopPropagation();
    }
}
