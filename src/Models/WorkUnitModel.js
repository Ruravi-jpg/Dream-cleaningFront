class WorkUnitModel {
    constructor(id, employeeId, startTime, finishTime, dayToWork){
        this.id = id;
        this.employeeId = employeeId;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.dayToWork = dayToWork;
    }
}

export default WorkUnitModel