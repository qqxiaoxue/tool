<script setup>
import AesTool from "./tools/AesTool.vue";
import BmiTool from "./tools/BmiTool.vue";
import CalculatorTool from "./tools/CalculatorTool.vue";
import CodecTool from "./tools/CodecTool.vue";
import ColorTool from "./tools/ColorTool.vue";
import CodeFormatTool from "./tools/CodeFormatTool.vue";
import CronTool from "./tools/CronTool.vue";
import DateDiffTool from "./tools/DateDiffTool.vue";
import ExtractTool from "./tools/ExtractTool.vue";
import FileBase64Tool from "./tools/FileBase64Tool.vue";
import FileHashTool from "./tools/FileHashTool.vue";
import HashTool from "./tools/HashTool.vue";
import HttpStatusTool from "./tools/HttpStatusTool.vue";
import ImageInfoTool from "./tools/ImageInfoTool.vue";
import ImageResizeTool from "./tools/ImageResizeTool.vue";
import Ipv4Tool from "./tools/Ipv4Tool.vue";
import JsonTool from "./tools/JsonTool.vue";
import JwtTool from "./tools/JwtTool.vue";
import LoanTool from "./tools/LoanTool.vue";
import MarkdownTool from "./tools/MarkdownTool.vue";
import NumberBaseTool from "./tools/NumberBaseTool.vue";
import PercentTool from "./tools/PercentTool.vue";
import PlaceholderTool from "./tools/PlaceholderTool.vue";
import RandomTool from "./tools/RandomTool.vue";
import RegexTool from "./tools/RegexTool.vue";
import ReplaceTool from "./tools/ReplaceTool.vue";
import TableTool from "./tools/TableTool.vue";
import TextTool from "./tools/TextTool.vue";
import TimeTool from "./tools/TimeTool.vue";
import UnitTool from "./tools/UnitTool.vue";
import UrlParserTool from "./tools/UrlParserTool.vue";
import UserAgentTool from "./tools/UserAgentTool.vue";

defineProps({
  tool: {
    type: Object,
    required: true,
  },
});

const componentMap = {
  AesTool,
  BmiTool,
  CalculatorTool,
  CodeFormatTool,
  CodecTool,
  ColorTool,
  CronTool,
  DateDiffTool,
  ExtractTool,
  FileBase64Tool,
  FileHashTool,
  HashTool,
  HttpStatusTool,
  ImageInfoTool,
  ImageResizeTool,
  Ipv4Tool,
  JsonTool,
  JwtTool,
  LoanTool,
  MarkdownTool,
  NumberBaseTool,
  PercentTool,
  PlaceholderTool,
  RandomTool,
  RegexTool,
  ReplaceTool,
  StatusTool: HttpStatusTool,
  TableTool,
  TextTool,
  TimeTool,
  UnitTool,
  UrlParserTool,
  UserAgentTool,
};
</script>

<template>
  <component :is="componentMap[tool.component]" :tool="tool" />
</template>
