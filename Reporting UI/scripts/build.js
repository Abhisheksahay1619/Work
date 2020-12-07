/*jslint node*/
/*property
    androidBundleVersion, applicationVersion, bundleVersion, getUTCDate,
    getUTCFullYear, getUTCHours, getUTCMinutes, getUTCMonth, length, log, parse,
    readFileSync, slice, spaces, split, stringify, version, writeFileSync,
    writeJson, dnnModuleName
*/

let nodeRefPath = "";
const fse = require(nodeRefPath + "fs-extra");
let buildVersionObject;

function getBundleVersion(day, month, year, hour, minute, currentBundleVersion, isAndroid) {
    let bundleVersion = "";
    if (!isAndroid) {
    //this will be used only by iOS:CFBundleVersion
        bundleVersion = currentBundleVersion.split(".")[0] + ".";
        bundleVersion += year + "." + month + "." + day + "." + hour + "." + minute;
    } else {
        bundleVersion = year + month + day + hour + minute;
    }
    return bundleVersion;
}
function getVersion(currentVersion) {
    return currentVersion;
    // Uncomment below code to automate applicationVersion increment
    // let versionComponents = currentVersion.split(".");
    // let newVersion = versionComponents[0] + "." + versionComponents[1] + "." + (parseInt(versionComponents[2] || 0, 10) + 1);
    // return newVersion;
}
function getVariableScripts() {
    let APPLICATION_VARIABLES = {
        applicationVersion: buildVersionObject.applicationVersion,
        bundleVersion: buildVersionObject.bundleVersion,
        dnnModuleName: buildVersionObject.dnnModuleName
    };
    return "export default " + JSON.stringify(APPLICATION_VARIABLES, null, "    ") + ";";
}
function getVersionObject(currentVersion, currentBundleVersion) {
    let todaysDate = new Date();
    let day = ("0" + todaysDate.getUTCDate()).slice(-2);
    let month = ("0" + (todaysDate.getUTCMonth() + 1)).slice(-2);
    let year = (("0" + todaysDate.getUTCFullYear()).slice(-2));
    let hour = (("0" + todaysDate.getUTCHours()).slice(-2));
    let minute = (("0" + todaysDate.getUTCMinutes()).slice(-2));
    let newVersionObj = {};
    newVersionObj.bundleVersion = getBundleVersion(day, month, year, hour, minute, currentBundleVersion, false);
    newVersionObj.applicationVersion = getVersion(currentVersion);
    newVersionObj.version = (
        newVersionObj.applicationVersion.length === 3
            ? (newVersionObj.applicationVersion + ".0")
            : newVersionObj.applicationVersion
    );
    return newVersionObj;
}
function versionPackageJson() {
    let packageJson = fse.readFileSync("package.json", "utf-8");
    let versionObj;
    packageJson = JSON.parse(packageJson);
    versionObj = getVersionObject(packageJson.applicationVersion, packageJson.bundleVersion);
    packageJson.version = versionObj.version;
    packageJson.applicationVersion = versionObj.applicationVersion;
    packageJson.bundleVersion = versionObj.bundleVersion;
    buildVersionObject = versionObj;
    buildVersionObject.dnnModuleName = packageJson.dnnModuleName;
    console.log(buildVersionObject);
    // versionConfigXML();
    fse.writeJson("package.json", packageJson, {spaces: "\t"}, function (err) {
        if (err) {
            console.log(err);
        }
        fse.writeFileSync("src/app.info.js", getVariableScripts(), "utf-8");
    });
}
function init() {
    versionPackageJson();
}
init();