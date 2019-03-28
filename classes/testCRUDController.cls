@isTest
public class testCRUDController {
    @isTest
    static void testGetSObjectsTypes(){
        Map<String, String> mapp = SchemaHelperController.getSObjectsTypes();
        System.debug(mapp.keySet());
        System.assert(mapp.keySet().contains('Account'));
    }

    @isTest
    static void testGetRecords(){
        Account acc = new Account();
        acc.Name = 'TestName';
        insert acc;

        List<SObject> listObjs = SobjectCRUDController.getRecords('Account', 'Name');
        for (SObject sObj: listObjs) {
           System.debug(sObj.getSObjectType());
           System.assertEquals(Account.getSObjectType(), sObj.getSObjectType());
        }
    }

    @isTest
    static void testDeleteRecords(){
        Account acc = new Account();
        acc.Name = 'TestName';
        insert acc;
        List<Account> accs = new List<Account>();
        accs.add(acc);
        SobjectCRUDController.deleteRecords(accs);
        System.assertEquals([SELECT Id FROM Account].size(), 0);
    }
}
