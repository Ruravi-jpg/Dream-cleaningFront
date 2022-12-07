class PropertyCreateModel {
    constructor(
        propertyModel
        )
    {
        this.Alias = propertyModel.alias;
        this.Address = propertyModel.address;
        this.BtwnStreet1 = propertyModel.btwnStreet1;
        this.BtwnStreet2 = propertyModel.btwnStreet2;
        this.HoursService = propertyModel.hoursService;
        this.CostService = propertyModel.costService;
        this.Comments = propertyModel.comments;
        this.ReferencePhotosList = propertyModel.referencePhotosList;
        this.EmployeesList = propertyModel.employeeIdList;
    }
}

export default PropertyCreateModel