(function (window, document) {
    angular.module('ngExportButton', ['ngExportButton.directive']);

    angular.module('ngExportButton.directive', ['mgcrea.ngStrap.dropdown', 'ui.bootstrap.modal', 'ngCsv', 'ngSanitize']);

    angular.module('ngExportButton.directive').directive('exportButton', ['$modal',
        function ($modal) {

            var linker = function (scope, element, attrs) {

                //function that open modal window
                scope.showModal = function () {
                    var modalInstance;
                    modalInstance = $modal.open(
                        {
                            scope: scope,
                            templateUrl: 'templates/fileName-modal.tpl.html'
                        }
                    );
                };

                scope.CSVheaders = angular.copy(scope.headers);

                //function that create and return data for csv report.
                scope.getSCVArray = function () {
                    var data = [];
                    angular.forEach(scope.resources, function (resource) {
                        var tmp = {};
                        angular.forEach(scope.fields, function (field) {
                            tmp[field] = resource[field];
                        });
                        data.push(tmp);
                    });
                    return data;
                };

                //function that create and return data for pdf table report.
                scope.getPDFDef = function () {

                    var data = [];
                    data.push(scope.headers);
                    angular.forEach(scope.resources, function (resource) {
                        var tmp = [];
                        angular.forEach(scope.fields, function (field) {
                            tmp.push(resource[field]);
                        });
                        data.push(tmp);
                    });


                    return {
                        content: [
                            {
                                table: {
                                    headerRows: 1,
                                    width: ['auto', 'auto', 'auto'],
                                    body: data
                                },
                                fontSize: scope.fontSize
                            }
                        ],
                        pageOrientation: scope.pageOrientation,
                        pageMargins: scope.pageMargins
                    };
                };

                //function that download pdf file
                scope.downloadPDF = function (filename) {

                    var documentDef = scope.getPDFDef();

                    pdfMake.createPdf(documentDef).download(filename + '.pdf');

                };

                //function that open pdf print dialog
                scope.printPDF = function () {

                    var documentDef = scope.getPDFDef();

                    pdfMake.createPdf(documentDef).print();
                };

            };

            return {
                restrict: 'AE',
                scope: {
                    fileName: '=exportFileName',
                    resources: '=resources',
                    fields: '=fields',
                    headers: '=headers',
                    pageOrientation: '=pageOrientation',
                    pageMargins: '=pageMargins',
                    fontSize: "=fontSize"
                },
                link: linker,
                transclude: true,
                templateUrl: 'templates/export-button.tpl.html'

            };
        }
    ]);

})(window, document);
