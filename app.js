console.log("Hello, welcome to London B2S3");
let viz;

//1. Create a Varilable to store the vizConatiner
const vizContainer = document.getElementById("vizContainer");

//2. Create a variable to store the dashboards options

const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

//3. Create a varibale to store the URLof the dash

const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia";

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

initViz();

// 4. Create constant for button
const exportPdfButton = document.getElementById("exportPdf");

//5. Create a funtion which runs when clicked

function exportPdfFunction() {
  viz.showExportPDFDialog();
}

//6. Create event listener on click
exportPdfButton.addEventListener("click", exportPdfFunction);

// 7. Create constant for button
const exportPptButton = document.getElementById("exportPpt");

//8. Create a funtion which runs when clicked

function exportPptFunction() {
  viz.showExportPowerPointDialog();
}

//9. Create event listener on click
exportPptButton.addEventListener("click", exportPptFunction);

// 10. Adding filters

const filterButton = document.getElementById("FilterButton");

filterButton.addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  // need to get active sheet, but this could be a dashboard or a worksheet

  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();

  //inspect the sheets you need to filter

  console.log(sheets);

  // index of the sheet you want to filter

  const sheetToFilter = sheets[0];

  // do the actual filtering

  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
