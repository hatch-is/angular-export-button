(function(window, document) {
    angular.module('ngExportButton', ['ngExportButton.directive']);

    angular.module('ngExportButton.directive', ['mgcrea.ngStrap', 'ngCsv', 'ngSanitize']);

    angular.module('ngExportButton.directive').
        directive('exportButton',['$modal',
            function($modal) {

                var linker = function(scope, element, attrs) {

                    //Init modal window instance
                    var fileNameModal = $modal({scope: scope, template: 'templates/fileName-modal.tpl.html', show: false});

                    //function that open modal window
                    scope.showModal = function() {
                        fileNameModal.$promise.then(fileNameModal.show);
                    };

                    //function that create and return data for csv report.
                    scope.getSCVArray = function() {
                        var data = [];
                        angular.forEach(scope.resources, function(resource) {
                            var tmp = {}
                            angular.forEach(scope.fields, function (field) {
                                tmp[field] = resource[field];
                            });
                            data.push(tmp);
                        });
                        return data;
                    };

                    //function that create and return data for pdf table report.
                    scope.getPDFDef = function(){

                        var data = [];
                        data.push(scope.headers);
                        angular.forEach(scope.resources, function(resource) {
                            var tmp = []
                            angular.forEach(scope.fields, function (field) {
                                tmp.push(resource[field]);
                            });
                            data.push(tmp);
                        });


                        var pdf ={
                            content: [
                                {
                                    table: {
                                        headerRows: 1,
                                        width: [ 'auto', 'auto', 'auto' ],
                                        body: data
                                    }
                                }
                            ]
                        };

                        return pdf;
                    };

                    //function that download pdf file
                    scope.downloadPDF = function(filename) {

                        var documentDef = scope.getPDFDef();

                        pdfMake.createPdf(documentDef).download(filename+'.pdf');

                    };

                    //function that open pdf print dialog
                    scope.printPDF = function() {

                        var documentDef = scope.getPDFDef();

                        pdfMake.createPdf(documentDef).print();
                    };

                };

                return {
                    restrict: 'AE',
                    scope: {
                        fileName  : '=exportFileName',
                        resources : '=resources',
                        fields : '=fields',
                        headers : '=headers'
                    },
                    link: linker,
                    transclude: true,
                    templateUrl: 'templates/export-button.tpl.html'

                };
            }
        ]);

})(window, document);