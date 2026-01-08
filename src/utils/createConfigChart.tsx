/* eslint-disable @typescript-eslint/no-explicit-any */

import Highcharts from "highcharts";
import "highcharts/modules/accessibility";
import "highcharts/modules/exporting";
import "highcharts/modules/full-screen";

/**
 * Reusable chart configuration
 * - Global options bilan birga individual chart options qo‘shish imkoniyati
 */
export const createChartConfig = (
  baseOptions: Highcharts.Options,
  isDark: boolean
): Highcharts.Options => {
  return Highcharts.merge(
    //    ---------------------- BASE OPTIONS ----------------------
    {
      chart: {
        backgroundColor: "transparent",
        zooming: {
          type: "x",
          resetButton: {
            position: {
              align: "right", // joylashuvi
              verticalAlign: "top",
              x: -35,
              y: -8,
            },
            theme: {
              fill: "#e74d00bb", // fon rangi
              stroke: "none", // border rangi
              r: 4, // burchak radiusi
              style: {
                color: "#000", // matn rangi
                fontSize: "10px", // matn o‘lchami
                fontWeight: "600",
              },
              states: {
                hover: {
                  fill: "#FF5308", // hover paytida fon
                },
              },
            },
          },
        },
        events: {
          fullscreenOpen: function (this: Highcharts.Chart) {
            this.update({
              chart: {
                backgroundColor: "#fff",
              },
              xAxis: {
                gridLineColor: isDark
                  ? "rgba(124,124,124,0.1)"
                  : "rgba(124,124,124,0.2)",
                labels: { style: { color: isDark ? "#FFFFFF" : "#000000" } },
                lineColor: "#6f6f6fff",
                tickColor: "#6f6f6fff",
              },
              yAxis: {
                gridLineColor: isDark
                  ? "rgba(124,124,124,0.1)"
                  : "rgba(124,124,124,0.2)",
                labels: { style: { color: isDark ? "#FFFFFF" : "#000000" } },
              },
              legend: {
                itemStyle: { color: isDark ? "#FFFFFF" : "#000000" },
              },
            });
          },
          fullscreenClose: function (this: Highcharts.Chart) {
            this.update({
              chart: {
                backgroundColor: "transparent",
              },
              xAxis: {
                gridLineColor: isDark
                  ? "rgba(124,124,124,0.1)"
                  : "rgba(124,124,124,0.2)",
                labels: { style: { color: "#a9a9a9)" } },
                lineColor: "rgba(124,124,124,0.9)",
                tickColor: "rgba(124,124,124,0.9)",
              },
              yAxis: {
                gridLineColor: isDark
                  ? "rgba(124,124,124,0.1)"
                  : "rgba(124,124,124,0.2)",
                labels: { style: { color: "#a9a9a9" } },
              },
              legend: {
                itemStyle: { color: isDark ? "#FFFFFF" : "#000000" },
              },
            });
          },
        },
      },

      //   ---------------------- TITLE CONFIG ----------------------
      title: {
        text: "",
        // align: "left",
        // style: {
        //   color: isDark ? "#FFFFFF" : "#000000",
        //   fontSize: "14px",
        //   fontWeight: "600",
        //   textAlign: "right !important"
        // }
      },
      //   ---------------------- FULLSCREEN BUTTON CONFIG ----------------------
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            enabled: false, // default context buttonni yashirish
          },
          fullscreenButton: {
            // --- POZITSIYA ---
            align: "right", // "left", "center", "right"
            verticalAlign: "top", // "top", "middle", "bottom"
            x: 8, // gorizontal siljitish
            y: -8, // vertikal siljitish

            // --- ICHKI KO‘RINISH ---
            symbol: "square", // "download", "menu", "print", "circle" va hokazo
            symbolFill: "transparent", // iconning ichki rangi
            symbolStroke: "#2F99B0", // icon chizig‘i rangi
            width: 19,
            height: 19,
            symbolStrokeWidth: 2, // chiziq qalinligi
            symbolSize: 10, // icon hajmi (default 12)
            symbolX: 10, // icon markazining X koordinatasi
            symbolY: 10, // icon markazining Y koordinatasi
            symbolZ: 0, // icon markazining Z koordinatasi

            // --- MATN (text) KO‘RINISHI ---
            text: "", // tugmadagi matn

            // --- TUGMA DIZAYNI (fon, border va hokazo) ---
            theme: {
              fill: "#fff", // tugma foni
              stroke: "#2F99B0", // tugma border rangi
              r: 2, // burchak radiusi

              states: {
                hover: {
                  fill: "#fff", // hover paytida fon rangi
                  style: { color: "yellow" }, // hover paytida matn rangi
                },
              },
            } as any,

            // --- EVENTLAR ---
            onclick: function () {
              // Cast to any to access the fullscreen API available at runtime on the chart instance
              (this as any).fullscreen.toggle(); // fullscreen yoqish yoki o‘chirish
            },
          },
        },
      },
      //   ---------------------- X AXIS ----------------------
      xAxis: {
        tickLength: 5,
        lineWidth: 2,
        tickWidth: 2,
        tickColor: "rgba(113, 113, 113, 0.1)",
        lineColor: "rgba(113, 113, 113, 0.1)",
        labels: {
          style: {
            color: "#a9a9a9",
            fontSize: "10px",
          },
          rotation: -20,
        },
        title: {
          style: {
            color: "",
            fontSize: "11px",
          },
        },
        gridLineDashStyle: "Dash",
        gridLineWidth: 1,
        gridLineColor: isDark
          ? "rgba(124,124,124,0.1)"
          : "rgba(124,124,124,0.1)",
        crosshair: {
          color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      //   ---------------------- Y AXIS ----------------------
      yAxis: {
        tickLength: 5,
        lineWidth: 2,
        tickWidth: 2,
        tickColor: "rgba(113, 113, 113, 0.1)",
        lineColor: "rgba(113, 113, 113, 0.1)",
        title: { text: "" },
        labels: {
          useHTML: true,
          style: {
            fontSize: "10px",
            color: "#a9a9a9",
          },
        },
        gridLineDashStyle: "Dash",
        gridLineWidth: 1,
        gridLineColor: isDark
          ? "rgba(124,124,124,0.1)"
          : "rgba(124,124,124,0.2)",
      },
      //   ---------------------- LEGEND CONFIG ----------------------
      legend: {
        itemStyle: {
          color: isDark ? "#FFFFFF" : "#000000",
          fontSize: "10px",
        },
        align: "center",
        verticalAlign: "bottom",
        // x: 0,
        // y: -15
      },
      //   ---------------------- TOOLTIP CONFIG ----------------------
      tooltip: {
        distance: 20,
        followPointer: true,
        backgroundColor: "#fff",
        style: {
          color: "#111",
        },
        padding: 8,
        borderWidth: 1,
        borderColor: "#2F99B0",
        borderRadius: 10,
        shadow: false,
        shared: true,
        useHTML: true,
        headerFormat: '<div class="text-center">{point.key}</div>',
      },
      credits: { enabled: false },
    },
    baseOptions
  );
};
