public with sharing class SobjectCRUDController {
    
    @AuraEnabled 
    public static Map<String, String> getSObjectsTypes(){
        return SchemaHelperController.getSObjectsTypes();
    }

    @AuraEnabled 
    public static List<SObject> getRecords(String sObjName, String fields){
        return Database.query('SELECT '+ fields + ' FROM '+ sObjName);
    }

    //     @AuraEnabled 
    // public static string createRecords(){
      
    // }

    @AuraEnabled
    public static void deleteRecords(List<SObject> records){
        try {
            delete records;
        } catch (Exception e) {
           throw new AuraHandledException('Error Exception happend' + e.getMessage());   
        }
    }

    //     @AuraEnabled
    // public static string updateRecords(){
      
    // }
}
