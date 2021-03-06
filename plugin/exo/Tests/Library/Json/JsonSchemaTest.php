<?php

namespace UJM\ExoBundle\Tests\Library\Json;

use Claroline\CoreBundle\Library\Testing\TransactionalTestCase;
use UJM\ExoBundle\Library\Json\JsonSchema;

class JsonSchemaTest extends TransactionalTestCase
{
    /**
     * @var JsonSchema
     */
    private $jsonSchema;

    /**
     * @var string
     */
    private $formatDir;

    public function setUp(): void
    {
        parent::setUp();

        $this->jsonSchema = new JsonSchema($this->client->getKernel()->getProjectDir());

        $vendorDir = realpath("{$this->client->getKernel()->getProjectDir()}/vendor");
        $this->formatDir = "{$vendorDir}/claroline/json-quiz/format";
    }

    /**
     * The validator MUST throw an exception if the schema file do not exist.
     */
    public function testInvalidSchemaUriThrowsException()
    {
        $this->expectException(\RuntimeException::class);

        $this->jsonSchema->validate([], 'unknown.json');
    }

    /**
     * The validator MUST NOT return errors when it receives valid data.
     */
    public function testValidDataThrowNoError()
    {
        $json = file_get_contents("{$this->formatDir}/quiz/examples/valid/content-and-question-steps.json");
        $data = json_decode($json);

        $this->assertEquals(0, count($this->jsonSchema->validate($data, 'quiz/schema.json')));
    }

    /**
     * The validator MUST return errors when it receives invalid data.
     */
    public function testInvalidDataThrowErrors()
    {
        $json = file_get_contents("{$this->formatDir}/quiz/examples/invalid/not-an-object.json");
        $data = json_decode($json);

        $this->assertGreaterThan(0, count($this->jsonSchema->validate($data, 'quiz/schema.json')));
    }
}
