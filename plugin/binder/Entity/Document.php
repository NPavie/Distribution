<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Sidpt\BinderBundle\Entity;

use Claroline\CoreBundle\Entity\Resource\AbstractResource;
use Claroline\CoreBundle\Entity\Widget\WidgetContainer;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Claroline\AppBundle\Entity\Identifier\Uuid;

/**
 * @ORM\Entity
 * @ORM\Table(name="sidpt_document")
 */
class Document extends AbstractResource
{
    use Uuid;
    /**
     * @ORM\Column(nullable=true, type="text")
     */
    private $longTitle = '';


    /**
     * @ORM\Column(type="boolean")
     */
    private $centerTitle = false;

    /**
     * @ORM\ManyToMany(
     *      targetEntity="Claroline\CoreBundle\Entity\Widget\WidgetContainer",
     *      cascade={"persist","remove"}
     * )
     * @ORM\JoinTable(name="sidpt_document_widgets",
     *      joinColumns={
                @ORM\JoinColumn(name="document_id", referencedColumnName="id")},
     *          inverseJoinColumns={
                    @ORM\JoinColumn(name="widget_container_id", referencedColumnName="id", unique=true)}
     *      )
     *
     * @var WidgetContainer[]|ArrayCollection
     */
    private $widgetContainers;

    /**
     * HomeTab constructor.
     */
    public function __construct()
    {
        $this->refreshUuid();
        $this->widgetContainers = new ArrayCollection();
    }

    /**
     * @return WidgetContainer[]|ArrayCollection
     */
    public function getWidgetContainers()
    {
        return $this->widgetContainers;
    }

    /**
     * @param string $containerId
     *
     * @return WidgetContainer|null
     */
    public function getWidgetContainer($containerId)
    {
        $found = null;

        foreach ($this->widgetContainers as $container) {
            if ($container->getUuid() === $containerId) {
                $found = $container;
                break;
            }
        }

        return $found;
    }

    public function addWidgetContainer(WidgetContainer $widgetContainer)
    {
        if (!$this->widgetContainers->contains($widgetContainer)) {
            $this->widgetContainers->add($widgetContainer);
        }
    }

    public function removeWidgetContainer(WidgetContainer $widgetContainer)
    {
        if ($this->widgetContainers->contains($widgetContainer)) {
            $this->widgetContainers->removeElement($widgetContainer);
        }
    }

    public function getLongTitle()
    {
        return $this->longTitle;
    }

    public function setLongTitle($longTitle)
    {
        $this->longTitle = $longTitle;
    }

    public function isCenterTitle()
    {
        return $this->centerTitle;
    }

    public function setCenterTitle($centerTitle)
    {
        $this->centerTitle = $centerTitle;
    }
}
