angular.module('myApp').service('adminService', function($http, $state) {


  this.submitNewCohort = function(newCohort, newStudents) {
    // console.log("service Adding New Cohort", newCohort);
    return $http({
      method: 'POST',
      url: '/api/cohort',
      data: {cohort: newCohort, students: newStudents}
    }).then(function(res) {
      console.log('cohort posted');
    }).catch(function(err) {
      console.error('cohort failed: ', err);
    });
  };


  this.submitNewStudent = function(newStudent) {
    return $http({
      method: 'POST',
      url: '/api/student',
      data: {
        cohort: newStudent.cohort,
        name: newStudent.name,
        home: newStudent.homeData,
        after: newStudent.afterData,
        job: newStudent.job
      }
    }).then(function(res) {
      console.log('student posted');
    });
  };

  this.getCohorts = function() {
    return $http({
      method: 'GET',
      url: '/api/cohort'
    }).then(function (res) {
      return res.data;
    });
  };

  this.editCohortData = function(editCohort, id) {
    console.log('editing', id);
    return $http({
      method: 'PUT',
      url: '/api/cohort/' + id,
      data: editCohort
    }).then(function(res){
      console.log('cohort updated');
    });
  };



});
