import React, { useEffect , useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from 'axios';

Chart.register(...registerables);

function Analytics() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    let existingLineChart = null;

    const createLineChart = () => {
      const lineChartCanvas = document.getElementById("chartjs-line");
    
      if (existingLineChart) {
        existingLineChart.destroy();
      }
    
      fetch("http://localhost:2000/api/playerScores")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching data");
          }
          return response.json();
        })
        .then((data) => {
          const labels = data.map((player) => player.scores.length.toString());
          const datasets = [];
    
          data.forEach((player) => {
            const playerName = player.playerName;
            const scores = player.scores;
    
            datasets.push({
              label: playerName,
              fill: true,
              backgroundColor: "transparent",
              borderColor: generateRandomColor(),
              data: scores,
            });
          });
    
          const chartData = {
            labels: labels,
            datasets: datasets,
          };
    
          const options = {
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            tooltips: {
              intersect: false,
            },
            hover: {
              intersect: true,
            },
            plugins: {
              filler: {
                propagate: false,
              },
            },
            scales: {
              xAxes: [
                {
                  reverse: true,
                  gridLines: {
                    color: "rgba(0,0,0,0.05)",
                  },
                  ticks: {
                    stepSize: 1,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    stepSize: 500,
                  },
                  display: true,
                  borderDash: [5, 5],
                  gridLines: {
                    color: "rgba(0,0,0,0)",
                    fontColor: "#fff",
                  },
                },
              ],
            },
          };
    
          existingLineChart = new Chart(lineChartCanvas, {
            type: "line",
            data: chartData,
            options: options,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    
    
    // Helper function to generate random colors
    function generateRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    

    const createBarChart = () => {
      const barChartCanvas = document.getElementById("chartjs-bar");
      const existingChart = Chart.getChart(barChartCanvas);
    
      if (existingChart) {
        existingChart.destroy();
      }
    
      fetch("http://localhost:2000/api/question-stats")
        .then(response => response.json())
        .then(data => {
          const easyData = data["easy"];
          const mediumData = data["medium"];
          const hardData = data["hard"];
    
          const chartData = {
            labels: ["Easy", "Medium", "Hard"],
            datasets: [
              {
                label: "Correct",
                backgroundColor: window.theme.primary,
                borderColor: window.theme.primary,
                hoverBackgroundColor: window.theme.primary,
                hoverBorderColor: window.theme.primary,
                data: [easyData.correct, mediumData.correct, hardData.correct],
                barPercentage: 0.75,
                categoryPercentage: 0.5,
              },
              {
                label: "Incorrect",
                backgroundColor: "#dee2e6",
                borderColor: "#dee2e6",
                hoverBackgroundColor: "#dee2e6",
                hoverBorderColor: "#dee2e6",
                data: [easyData.incorrect, mediumData.incorrect, hardData.incorrect],
                barPercentage: 0.75,
                categoryPercentage: 0.5,
              },
            ],
          };
    
          const options = {
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                  zeroLineColor: "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                  beginAtZero: true,
                  stepSize: 20,
                  suggestedMax: 100,
                },
              },
            },
          };
    
          new Chart(barChartCanvas, {
            type: "bar",
            data: chartData,
            options: options,
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    };
    
   /*  const createDoughnutChart = () => {
      const doughnutChartCanvas = document.getElementById("chartjs-doughnut");
      const existingChart = Chart.getChart(doughnutChartCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(doughnutChartCanvas, {
        type: "doughnut",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                window.theme.primary,
                window.theme.success,
                window.theme.warning,
                window.theme.danger,
                window.theme.info,
                window.theme.secondary,
              ],
              borderColor: "transparent",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          cutoutPercentage: 80,
          legend: {
            display: false,
          },
        },
      });
    }; */
    


    const createDoughnutChart = () => {
      const doughnutChartCanvas = document.getElementById("chartjs-doughnut");
      const existingChart = Chart.getChart(doughnutChartCanvas);
    
      if (existingChart) {
        existingChart.destroy();
      }
    
      fetch("http://localhost:2000/api/multiplayerMatchResults")
        .then(response => response.json())
        .then(data => {
          const playerData = Object.entries(data);
          const labels = [];
          const datasets = [];
          const backgroundColors = [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ]; // Add more colors as needed
          
          playerData.forEach(([playerName, playerStats], index) => {
            labels.push(playerName);
              
            const backgroundColor = backgroundColors[index % backgroundColors.length];
            
            // Check if playerStats exists and is not empty
            if (playerStats && playerStats.length > 0) {
              const { gamesWon, gamesLost, totalGames } = playerStats[0];
              
              // Check if gamesWon, gamesLost, and totalGames exist
              if (gamesWon !== undefined && gamesLost !== undefined && totalGames !== undefined) {
                datasets.push({
                  data: [gamesWon, gamesLost, totalGames],
                  backgroundColor: backgroundColor,
                  borderColor: "transparent",
                });
              }
            }
          });

          console.log(datasets);
    
          const chartData = {
            labels: labels,
            datasets: datasets,
          };
    
          const options = {
            maintainAspectRatio: false,
            cutoutPercentage: 80,
            legend: {
              display: true,
            },
            tooltips: {
              callbacks: {
                label: function (context) {
                  const data = context.dataset.data;
                  const gamesWon = data[0];
                  const gamesLost = data[1];
                  const totalGames = data[2];
    
                  return `Games Won: ${gamesWon}, Games Lost: ${gamesLost}, Total Games: ${totalGames}`;
                },
              },
            },
          };
    
          new Chart(doughnutChartCanvas, {
            type: "doughnut",
            data: chartData,
            options: options,
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    };
   /*  const fetchMultiplayerMatchResults = () => {
      return fetch("http://localhost:2000/api/multiplayerMatchResults")
        .then((response) => response.json())
        .catch((error) => {
          throw new Error("Failed to fetch multiplayer match results");
        });
    };
    
    // Function to create the doughnut chart
const createDoughnutChart = () => {
  const doughnutChartCanvas = document.getElementById("chartjs-doughnut");
  const existingChart = Chart.getChart(doughnutChartCanvas);

  if (existingChart) {
    existingChart.destroy();
  }

  // Fetch multiplayer match results from API
  fetchMultiplayerMatchResults()
  console.log(playerResults)
    .then((playerResults) => {
      const playerNames = Object.keys(playerResults);
      const gamesWon = playerNames.map((name) => playerResults[name].gamesWon);
      const gamesLost = playerNames.map((name) => playerResults[name].gamesLost);
      const totalGames = playerNames.map((name) => playerResults[name].totalGames);

      new Chart(doughnutChartCanvas, {
        type: "doughnut",
        data: {
          labels: playerNames,
          datasets: [
            {
              data: gamesWon,
              backgroundColor: [
                window.theme.primary,
                window.theme.success,
                window.theme.warning,
                window.theme.danger,
                window.theme.info,
                window.theme.secondary,
              ],
              borderColor: "transparent",
              label: "Games Won",
            },
            {
              data: gamesLost,
              backgroundColor: [
                window.theme.light,
                window.theme.secondaryLight,
                window.theme.warningLight,
                window.theme.dangerLight,
                window.theme.infoLight,
                window.theme.secondaryLight,
              ],
              borderColor: "transparent",
              label: "Games Lost",
            },
            {
              data: totalGames,
              backgroundColor: [
                window.theme.lighter,
                window.theme.secondaryLighter,
                window.theme.warningLighter,
                window.theme.dangerLighter,
                window.theme.infoLighter,
                window.theme.secondaryLighter,
              ],
              borderColor: "transparent",
              label: "Total Games",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          cutoutPercentage: 80,
          legend: {
            display: true,
            position: "bottom",
          },
          plugins: {
            labels: {
              render: "percentage",
              precision: 2,
              fontColor: "#fff",
              fontSize: 12,
              fontStyle: "bold",
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error("Failed to fetch multiplayer match results:", error);
    });
};
 */
    
    
   /*  const createPieChart = () => {
      const pieChartCanvas = document.getElementById("chartjs-pie");
      const existingChart = Chart.getChart(pieChartCanvas);

      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(pieChartCanvas, {
        type: "pie",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                window.theme.primary,
                window.theme.success,
                window.theme.warning,
                window.theme.danger,
                window.theme.info,
                window.theme.secondary,
              ],
              borderColor: "transparent",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          cutoutPercentage: 0,
        },
      });
    }; */
    
   /*  const createPieChart = async () => {
      const pieChartCanvas = document.getElementById("chartjs-pie");
      const existingChart = Chart.getChart(pieChartCanvas);
    
      if (existingChart) {
        existingChart.destroy();
      }
    
      try {
        const response = await axios.get("http://localhost:2000/api/questionstopics");
        const questions = response.data.question;
  
        // Count the number of questions for each topic
        const topicCounts = {};
        questions.forEach((question) => {
          const topic = question.topic;
         // console.log(topicCounts)
          if (topicCounts.hasOwnProperty(topic)) {
            topicCounts[topic]++;
          } else {
            topicCounts[topic] = 1;
          }
        });
    
        const labels = Object.keys(topicCounts);
        const topicQuestionCounts = Object.values(topicCounts);
    
        new Chart(pieChartCanvas, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                data: topicQuestionCounts,
                backgroundColor: [
                  window.theme.primary,
                  window.theme.success,
                  window.theme.warning,
                  window.theme.danger,
                  window.theme.info,
                  window.theme.secondary,
                ],
                borderColor: "transparent",
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            cutoutPercentage: 0,
          },
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }; */
    
    const createPieChart = async () => {
      const pieChartCanvas = document.getElementById("chartjs-pie");
      const existingChart = Chart.getChart(pieChartCanvas);
    
      if (existingChart) {
        existingChart.destroy();
      }
    
      try {
        // Fetch data from the API
        const response = await fetch('http://localhost:2000/api/questionstopics');
        const data = await response.json();
    
        const labels = Object.keys(data);
        const counts = Object.values(data);
    
        new Chart(pieChartCanvas, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                data: counts,
                backgroundColor: [
                  window.theme.primary,
                  window.theme.success,
                  window.theme.warning,
                  window.theme.danger,
                  window.theme.info,
                  window.theme.secondary,
                ],
                borderColor: "transparent",
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            cutoutPercentage: 0,
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    

    createLineChart();
    createBarChart();
    createDoughnutChart();
    createPieChart();
  }, []);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="mb-3">
              <h1 className="h3 d-inline align-middle">Analytics</h1>
            </div>
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">Question Count</h5>
                    <h6 className="card-subtitle text-muted">
                      Monthly summary
                    </h6>
                  </div>
                  <div className="card-body">
                    <canvas
                      id="chartjs-line"
                      style={{ height: "300px" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">Question Analytics</h5>
                    <h6 className="card-subtitle text-muted">
                      Difficulty summary
                    </h6>
                  </div>
                  <div className="card-body">
                    <canvas
                      id="chartjs-bar"
                      style={{ height: "300px" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">MultiPlayer Result</h5>
                    <h6 className="card-subtitle text-muted">
                      Player summary
                    </h6>
                  </div>
                  <div className="card-body">
                    <canvas
                      id="chartjs-doughnut"
                      style={{ height: "300px" }}
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title">Topic Result</h5>
                    <h6 className="card-subtitle text-muted">
                      Topics summary
                    </h6>
                  </div>
                  <div className="card-body">
                    <canvas
                      id="chartjs-pie"
                      style={{ height: "300px" }}
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Analytics;
