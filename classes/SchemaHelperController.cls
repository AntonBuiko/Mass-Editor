public with sharing class SchemaHelperController {

    public static Map<String, Schema.SObjectType> mapObjects = Schema.getGlobalDescribe();
    public static String[] avalabelObjects = getAvalableObjects();
    public static Map<String, String> mapObjectsAndFields = new Map<String, String>();
    
    @AuraEnabled
    public static Map<String, String> getSObjectsTypes(){ 
        for (Schema.SObjectType obj : mapObjects.values()) {
            DescribeSObjectResult description = obj.getDescribe();
            if((description.isAccessible()
                && description.isCreateable()
                && description.isDeletable()
                && description.isUpdateable()
                && description.isQueryable()
                && description.isSearchable()
                && getAvalableObjects().contains(description.getName()))
                || description.isCustom()){
                mapObjectsAndFields.put(description.getName(), fetchJsonDescribeField(description));
                // List<Schema.ChildRelationship> listChilds = description.getChildRelationships();
                // for(Schema.ChildRelationship child : listChilds){
                // if (!child.isRestrictedDelete() && child.isCascadeDelete()) {  
                // System.debug(description.getName() + '   ' + child.getRelationshipName());
                //     }
                // }
            }
        }
        return mapObjectsAndFields;
    }

    public static String fetchJsonDescribeField(Schema.DescribeSObjectResult describeSobj){
        List<String> listMetadataObj = new List<String>();
        Map <String, Schema.SObjectField> fieldMap = describeSobj.fields.getMap();
        String nillibleFields = '';
        String requiredFields = '';
        for (SObjectField field : fieldMap.values()) {
            Schema.DescribeFieldResult describeField = field.getDescribe();
            if ((describeField.isAccessible()
                && !describeField.isRestrictedDelete()
                && describeField.isSortable()
                && describeField.isUpdateable())
                || describeField.isIdLookup()){  
                    String jsonPart = '{';
                    jsonPart += '"label":"' + describeField.getLabel() + '",';
                    jsonPart += '"value":"' + describeField.getName() + '"';
                    jsonPart += '}';
                    if (describeField.isNillable()) {
                        if(nillibleFields != ''){
                            nillibleFields += ',';
                        }               
                       nillibleFields += jsonPart;
                    }
                    else {
                        if(requiredFields != ''){
                            requiredFields += ',';
                        }
                        requiredFields += jsonPart;
                    }
            }
        }
        System.debug(requiredFields);
        System.debug(nillibleFields);
        return '['+ requiredFields + ',' + nillibleFields+']';
    }

    public static String[] getAvalableObjects(){
        return new String[]{
                'Account', 
                'Asset',
                'Campaign',
                'Case',
                'Contact',
                'ContentVersion',
                'Contract',
                'Entitlement',
                'EntityMilestone',
                'EnvironmentHubMember',
                'Lead',
                'MaintenancePlan',
                'OperatingHours',
                'Opportunity',
                'Order',
                'Product2',
                'Pricebook2',
                'Quote',
                'ResourcePreference',
                'ReturnOrder',
                'ServiceAppointment',
                'ServiceResource',
                'ServiceTerritory',
                'ServiceTerritoryMember',
                'ServiceResourceSkill',
                'ServiceCrew',
                'ServiceCrewMember',
                'ServiceContract',
                'Shipment',
                'SkillRequirement',
                'SocialPost',
                'Tenant',
                'TimeSheet',
                'TimeSheetEntry',
                'WorkType',
                'WorkOrder',
                'WorkOrderLineIte'
        };
    }
}