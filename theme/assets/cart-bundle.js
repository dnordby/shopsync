/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/custom/cart-bundle.ts":
/*!**************************************!*\
  !*** ./assets/custom/cart-bundle.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst cartDeleteUrl = `/cart/change.js`;\nconst deleteButtons = document.querySelectorAll(\".js-delete-bundle\");\nconst CartBundle = () => __awaiter(void 0, void 0, void 0, function* () {\n    const removeFromCart = (button) => __awaiter(void 0, void 0, void 0, function* () {\n        const deleteItemsString = button.dataset.remove;\n        const deleteItemsArray = deleteItemsString.split(\",\");\n        const parentWrapper = button.closest(\".cart-item\");\n        parentWrapper.remove();\n        for (const lineKey of deleteItemsArray) {\n            const payload = {\n                id: lineKey,\n                quantity: 0,\n            };\n            yield fetch(cartDeleteUrl, {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                },\n                body: JSON.stringify(payload),\n            });\n        }\n        window.location.reload();\n    });\n    deleteButtons.forEach((button) => {\n        button.addEventListener(\"click\", () => {\n            removeFromCart(button);\n        });\n    });\n});\nexports[\"default\"] = CartBundle();\n\n\n//# sourceURL=webpack://grim-delights/./assets/custom/cart-bundle.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/custom/cart-bundle.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;