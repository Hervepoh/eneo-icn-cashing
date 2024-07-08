<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AciRequests extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'    => [
                'type'          => 'INT',
                'constraint'    => 11,
                'auto_increment'    => True
            ],
            'customer'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'amount'    => [
                'type'          => 'INT',
                'constraint'    => 11,  
            ],
            'payment_date'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'payment_mode'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'bank'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'status'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'userId'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'generatedBy'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'generatedBy'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'validatedAt'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'createdBy'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'createdBy'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'modifiedBy'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'createdAt'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255
            ],
            'updatedAt'    => [
                'type'          => 'VARCHAR',
                'constraint'    => 255              
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('aci_requests', true);
    }

    public function down()
    {
        $this->forge->dropTable('aci_requests');
    }
}
