"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(request, response) {
    const params = {
        name: 'Node',
        duration: 10,
        educator: 'Diego Henrique',
    };
    CreateCourseService_1.default.execute(params);
    return response.send();
}
exports.createCourse = createCourse;
