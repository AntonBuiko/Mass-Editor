public with sharing class SchemaHelperController {

    public static Map<String, Schema.SObjectType> mapObjects = Schema.getGlobalDescribe();
    public static String[] avalabelObjects = getAvalableObjects();
    public static Map<String, String> mapObjectsAndFields = new Map<String, String>();
    
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
                mapObjectsAndFields.put(description.getName(), fetchFieldJson(description));
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

    public static String fetchFieldJson(Schema.DescribeSObjectResult describeSobj){
        List<String> listMetadataObj = new List<String>();
        Map <String, Schema.SObjectField> fieldMap = describeSobj.fields.getMap();
        String result = '';
        for (SObjectField field : fieldMap.values()) {
            Schema.DescribeFieldResult describeField = field.getDescribe();
            if (describeField.isAccessible()){  
                    if(result != ''){
                        result += ',';
                    }
                    String jsonPart = '{';
                    jsonPart += '"label":"' + describeField.getLabel() + '",';
                    jsonPart += '"value":"' + describeField.getName() + '"';
                    jsonPart += '}';
                    result += jsonPart;
            }
        }
        return '['+result+']';
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