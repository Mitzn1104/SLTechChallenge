public class FinancialServicesAccsController {
  
	@AuraEnabled
    public static List < Account > fetchAccs() {
        return [ SELECT Id, Name, Phone, Website,AnnualRevenue, Owner.Name FROM Account WHERE Industry = 'Financial Services' WITH SECURITY_ENFORCED ];
    }
    
    @AuraEnabled
    public static void updateAccount(List<Account> acc ){
        try{
            update acc;
        }catch(DMLException e){
            throw new AuraHandledException(e.getDmlMessage(0));
        }
    }
  
}