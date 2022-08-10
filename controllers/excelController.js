const excelJS = require("exceljs");
const TestView = require("../views/testView");

const exportTests = async (req, res) => {
  const tests = await TestView.getAllTest();

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("AllTests"); // New Worksheet

  // Path to download excel
  const path = "./files";

  worksheet.columns = [
    { header: "S no.", key: tests.id, width: 10 },
    { header: "First Name", key: "fname", width: 10 },
    { header: "Last Name", key: "lname", width: 10 },
    { header: "Email Id", key: "email", width: 10 },
    { header: "Gender", key: "gender", width: 10 },
  ];

  // looping through test data
  let counter = 1;
  tests.forEach((test) => {
    test.id = counter;
    worksheet.addRow(test); // Add data in worksheet
    counter++;
  });

  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    const data = await workbook.xlsx
      .writeFile(`${path}/tests.xlsx`)
      .then(() => {
        res.send({
          status: "success",
          message: "file successfully downloaded",
          path: `${path}/tests.xlsx`,
        });
      });
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
