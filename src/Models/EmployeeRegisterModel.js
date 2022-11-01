class EmployeeCreateModel {
    constructor(Name, LastName, StreetAddress, RefStreet1, RefStreet2, Comments, User){
        this.Name = Name;
        this.LastName = LastName;
        this.StreetAddress = StreetAddress;
        this.RefStreet1 = RefStreet1;
        this.RefStreet2 = RefStreet2;
        this.Comments = Comments;
        this.User = User;
    }
}

export default EmployeeCreateModel