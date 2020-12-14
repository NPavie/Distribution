<?php

namespace Sidpt\BinderBundle\Controller;

use Claroline\AppBundle\API\Crud;
use Claroline\AppBundle\API\FinderProvider;
use Claroline\AppBundle\Controller\AbstractApiController;
use Claroline\AppBundle\Controller\RequestDecoderTrait;
use Claroline\CoreBundle\Security\PermissionCheckerTrait;


use Claroline\AppBundle\Persistence\ObjectManager;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Sidpt\BinderBundle\Entity\Document;
use Sidpt\BinderBundle\Serializer\DocumentSerializer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class DocumentController
{
    use PermissionCheckerTrait;
    use RequestDecoderTrait;

    /** @var ObjectManager */
    private $om;
    /** @var PlatformConfigurationHandler */
    private $config;
    /** @var Environment */
    private $finder;
    /** @var Crud */
    private $crud;
    /** @var SerializerProvider */
    private $serializer;


    public function __construct(
        AuthorizationCheckerInterface $authorization,
        PlatformConfigurationHandler $config,
        ObjectManager $om,
        FinderProvider $finder,
        Crud $crud,
        SerializerProvider $serializer
    ) {
        $this->authorization = $authorization;
        $this->config = $config;
        $this->om = $om;
        $this->crud = $crud;
        $this->serializer = $serializer;
        $this->finder = $finder;
    }

    /**
     * @Route("/{id}", name="sidpt_document_update", methods={"PUT"})
     * @EXT\ParamConverter("document", class="SidptBinderBundle:Document", options={"mapping": {"id": "uuid"}})
     */
    public function updateAction(Document $document, Request $request): JsonResponse
    {
        $this->checkPermission('EDIT', $document->getResourceNode(), [], true);

        $data = $this->decodeRequest($request);
        $object = $this->crud->update(Document::class, $data);

        return new JsonResponse(
            $this->serializer->serialize($object)
        );
    }
}
