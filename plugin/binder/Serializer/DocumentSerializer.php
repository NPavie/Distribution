<?php

namespace Sidpt\BinderBundle\Serializer;

use Claroline\AppBundle\API\Options;
use Claroline\AppBundle\API\Serializer\SerializerTrait;
use Claroline\AppBundle\Persistence\ObjectManager;

use Claroline\CoreBundle\Entity\Widget\WidgetContainer;
use Claroline\CoreBundle\API\Serializer\Widget\WidgetContainerSerializer;


use Sidpt\BinderBundle\Entity\Document;



/**
 * @todo simplify relationships (there are lots of duplicates)
 * @todo simplify serialized structure
 */
class DocumentSerializer
{
    use SerializerTrait;

    /** @var ObjectManager */
    private $om;
    /** @var WidgetContainerFinder */
    private $widgetContainerFinder;
    /** @var WidgetContainerSerializer */
    private $widgetContainerSerializer;
    
    /** @var PublicFileSerializer */
    private $publicFileSerializer;

    /**
     * DocumentSerializer constructor.
     *
     * @param ObjectManager             $om
     * @param WidgetContainerSerializer $widgetContainerSerializer
     */
    public function __construct(
        ObjectManager $om,
        WidgetContainerSerializer $widgetContainerSerializer
    ) {
        $this->om = $om;
        $this->widgetContainerSerializer = $widgetContainerSerializer;
    }

    public function getName()
    {
        return 'file'; 
        // or document, not sure if it is the resource codename in javascript or the php classname that is needed
    }

    public function getClass()
    {
        return Document::class;
    }

    public function serialize(Document $document, array $options = []): array
    {

        /** @var WidgetContainer[] $savedContainers */
        $savedContainers = $document->getWidgetContainers()->toArray();
        $containers = [];

        foreach ($savedContainers as $container) {
            //temporary
            $widgetContainer = $container->getWidgetContainers()[0];
            if ($widgetContainer) {
                if (!array_key_exists($widgetContainer->getPosition(), $containers)) {
                    $containers[$widgetContainer->getPosition()] = $container;
                } else {
                    $containers[] = $container;
                }
            }
        }

        ksort($containers);
        $containers = array_values($containers);

        $data = [
            'id' => $document->getUuid(),
            'title' => $document->getName(),
            'slug' => $document->getLongTitle() ? substr(strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $document->getLongTitle()))), 0, 128) : 'new',
            'longTitle' => $document->getLongTitle(),
            'centerTitle' => $document->isCenterTitle(),
            'widgets' => array_map(function ($container) use ($options) {
                return $this->widgetContainerSerializer->serialize($container, $options);
            }, $containers),
        ];

        return $data;
    }

    public function deserialize(array $data, Document $document = null, array $options = []): Document
    {

    	if(empty($document)){
    		$document = new Document();
    	}

        $this->sipe('title', 'setName', $data, $document);
        $this->sipe('longTitle', 'setLongTitle', $data, $document);
        $this->sipe('centerTitle', 'setCenterTitle', $data, $document);
        

        if (isset($data['widgets'])) {
            /** @var WidgetContainer[] $currentContainers */
            $currentContainers = $document->getWidgetContainers()->toArray();
            $containerIds = [];

            // update containers
            foreach ($data['widgets'] as $position => $widgetContainerData) {
                if (isset($widgetContainerData['id'])) {
                    $widgetContainer = $document->getWidgetContainer($widgetContainerData['id']);
                }

                if (empty($widgetContainer)) {
                    $widgetContainer = new WidgetContainer();
                }

                $this->widgetContainerSerializer->deserialize($widgetContainerData, $widgetContainer, $options);
                //$widgetContainer->setDocument($document);
                $widgetContainer = $widgetContainer->getWidgetContainers()[0];
                $widgetContainer->setPosition($position);
                $containerIds[] = $widgetContainer->getUuid();
            }

            // removes containers which no longer exists
            foreach ($currentContainers as $currentContainer) {
                if (!in_array($currentContainer->getUuid(), $containerIds)) {
                    //$currentContainer->setDocument(null);
                    $this->om->remove($currentContainer);
                }
            }
        }

        return $document;
    }
}
