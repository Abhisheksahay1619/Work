/*jslint node*/
const path = require("path");
const fs = require("fs-extra");
const util = require("util");
const replace = require("replace-in-file");
const moduleName = require("../package.json").dnnModuleName;
const replaceBlockTemplates = {
    vendorjs: `[JavaScript:{ path: "~/DesktopModules/BuserNetModules/${moduleName}/dist/js/%s", priority:100}]`,
    css: `[Css:{ path: "~/DesktopModules/BuserNetModules/${moduleName}/dist/css/%s"}]`,
    userjs: `[JavaScript:{ path: "~/DesktopModules/BuserNetModules/${moduleName}/dist/js/%s", priority:100, provider: "DnnFormBottomProvider"}]`
};
const dnnModulePath = path.resolve(__dirname, `../../../${moduleName}/dnn`);
const distFolderPath = path.resolve(__dirname, "../dist");

const getRegex = (identifier) => new RegExp(`(<!\\-\\- build:${identifier} \\-\\->)([\\s\\S]*?)(<!\\-\\- endbuild \\-\\->)`, "gm");
const getReplaceBlock = (identifier, replaceString) => {
    let identifierTagStart = `<!-- build:${identifier} -->`;
    let identifierTagEnd = "<!-- endbuild -->";
    return identifierTagStart + "\n" + replaceString + "\n" + identifierTagEnd;
};

const createFileReference = (files, template) => {
    if (Array.isArray(files)) {
        return files.map((file) => util.format(template, file)).join("\n");
    } else {
        return util.format(template, file);
    }
};

const getFiles = async () => {
    console.log("Getting latest files information ... ");
    let vendorjs;
    let userjs;
    let css;
    try {
        let jsfiles;
        [jsfiles, css] = await Promise.all([fs.readdir(`${distFolderPath}/js`), fs.readdir(`${distFolderPath}/css`)]);
        userjs = jsfiles.filter(file => ((file.startsWith("app.") || file.startsWith("chunk-vendors.")) && file.endsWith(".js")));
        vendorjs = jsfiles.filter(file => (file.startsWith("chunk-") && !file.includes("vendors") && file.endsWith("js")));
        css = css.filter(file => file.endsWith("css"));
        console.log("Files information fetched successfully");
        return {
            userjs: userjs,
            css: css,
            vendorjs: vendorjs
        }
    } catch (e) {
        console.error(e);
    }
}

const initProcess = async () => {
    try {
        let distFiles = await getFiles();
        fs.remove(`${dnnModulePath}/dist`).then(() => {
            console.log("Files removed successfully");
            fs.copy(distFolderPath, `${dnnModulePath}/dist`, { overwrite: true }).then(() => {
                console.log("Files copied successfully");
                let replaceOptions = {
                    files: `${dnnModulePath}/View.html`,
                    from: [],
                    to: [],
                    countMatches: true,
                }

                Object.keys(distFiles).forEach(blockIdentifier => {
                    replaceOptions.from.push(getRegex(blockIdentifier));
                    replaceOptions.to.push(getReplaceBlock(blockIdentifier, createFileReference(distFiles[blockIdentifier], replaceBlockTemplates[blockIdentifier])));
                });

                replace(replaceOptions).then(files => {
                    console.log(`Successfully replaced ${files[0].numReplacements} out of ${files[0].numMatches} matches`);
                });
            });
        });
    } catch (e) {
        console.error(e);
    }
}

initProcess();
