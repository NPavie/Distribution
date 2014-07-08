<?phpnamespace Icap\PortfolioBundle\Entity\Widget;use Doctrine\Common\Collections\ArrayCollection;use Doctrine\ORM\Mapping as ORM;use Gedmo\Mapping\Annotation as Gedmo;use Symfony\Component\Validator\Constraints as Assert;/** * @ORM\Table(name="icap__portfolio_widget_formations") * @ORM\Entity */class FormationsWidget extends AbstractWidget{    protected $widgetType = 'formations';    /**     * @var string     *     * @ORM\Column(type="string", nullable=false)     */    protected $name;    /**     * @var \Date     *     * @ORM\Column(type="datetime", nullable=true)     */    protected $startDate;    /**     * @var \Date     *     * @ORM\Column(type="datetime", nullable=true)     */    protected $endDate;    /**     * @var FormationsWidgetResource[]|\Doctrine\ORM\PersistentCollection     *     * @ORM\OneToMany(targetEntity="Icap\PortfolioBundle\Entity\Widget\FormationsWidgetResource", mappedBy="widget", cascade={"persist", "remove"})     */    protected $resources;    public function __construct()    {        $this->resources = new ArrayCollection();    }    /**     * @param \Icap\PortfolioBundle\Entity\Widget\FormationsWidgetFormation[] $resources     *     * @return FormationsWidget     */    public function setResources($resources)    {        foreach ($resources as $resource) {            $resource->setWidget($this);        }        $this->resources = $resources;        return $this;    }    /**     * @return \Icap\PortfolioBundle\Entity\Widget\FormationsWidgetFormation[]     */    public function getResources()    {        return $this->resources;    }    /**     * @param string $name     *     * @return SkillsWidgetSkill     */    public function setName($name)    {        $this->name = $name;        return $this;    }    /**     * @return string     */    public function getName()    {        return $this->name;    }    /**     * @param \Date $endDate     *     * @return FormationsWidget     */    public function setEndDate($endDate)    {        $this->endDate = $endDate;        return $this;    }    /**     * @return \Date     */    public function getEndDate()    {        return $this->endDate;    }    /**     * @param \Date $startDate     *     * @return FormationsWidget     */    public function setStartDate($startDate)    {        $this->startDate = $startDate;        return $this;    }    /**     * @return \Date     */    public function getStartDate()    {        return $this->startDate;    }    /**     * @return array     */    public function getData()    {        $data = array(            'id'        => $this->getId(),            'name'      => $this->getName(),            'startDate' => $this->getStartDate(),            'endDate'   => $this->getEndDate(),            'children'  => array()        );        foreach ($this->getResources() as $formation) {            $data['children'][] = $formation->getData();        }        return $data;    }    /**     * @return array     */    public function getEmpty()    {        return array(            'name'      => null,            'startDate' => null,            'endDate'   => null,            'children'  => array()        );    }    /**     * @return array     */    public function getChildren()    {        return $this->getResources();    }}