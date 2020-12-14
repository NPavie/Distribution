<?php

namespace Sidpt\BinderBundle\Installation\Migrations\pdo_mysql;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated migration based on mapping information: modify it with caution.
 *
 * Generation date: 2020/12/14 03:01:41
 */
class Version20201214150139 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql("
            CREATE TABLE sidpt_document (
                id INT AUTO_INCREMENT NOT NULL, 
                longTitle LONGTEXT DEFAULT NULL, 
                centerTitle TINYINT(1) NOT NULL, 
                uuid VARCHAR(36) NOT NULL, 
                resourceNode_id INT DEFAULT NULL, 
                UNIQUE INDEX UNIQ_F4A7C431D17F50A6 (uuid), 
                UNIQUE INDEX UNIQ_F4A7C431B87FAB32 (resourceNode_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET UTF8 COLLATE `UTF8_unicode_ci` ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE sidpt_document_widgets (
                document_id INT NOT NULL, 
                widget_container_id INT NOT NULL, 
                INDEX IDX_21883A0CC33F7837 (document_id), 
                UNIQUE INDEX UNIQ_21883A0C581122C3 (widget_container_id), 
                PRIMARY KEY(
                    document_id, widget_container_id
                )
            ) DEFAULT CHARACTER SET UTF8 COLLATE `UTF8_unicode_ci` ENGINE = InnoDB
        ");
        $this->addSql("
            ALTER TABLE sidpt_document 
            ADD CONSTRAINT FK_F4A7C431B87FAB32 FOREIGN KEY (resourceNode_id) 
            REFERENCES claro_resource_node (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE sidpt_document_widgets 
            ADD CONSTRAINT FK_21883A0CC33F7837 FOREIGN KEY (document_id) 
            REFERENCES sidpt_document (id)
        ");
        $this->addSql("
            ALTER TABLE sidpt_document_widgets 
            ADD CONSTRAINT FK_21883A0C581122C3 FOREIGN KEY (widget_container_id) 
            REFERENCES claro_widget_container (id)
        ");
    }

    public function down(Schema $schema)
    {
        $this->addSql("
            ALTER TABLE sidpt_document_widgets 
            DROP FOREIGN KEY FK_21883A0CC33F7837
        ");
        $this->addSql("
            DROP TABLE sidpt_document
        ");
        $this->addSql("
            DROP TABLE sidpt_document_widgets
        ");
    }
}
