const INF = 99999;

class AllPairShortestPath {
  constructor() {
    this.V = 4;
  }

  floydWarshall(graph) {
    const dist = Array.from(Array(this.V), () => new Array(this.V).fill(0));
    let i, j, k;

    for (i = 0; i < this.V; i++) {
      for (j = 0; j < this.V; j++) {
        dist[i][j] = graph[i][j];
      }
    }

    for (k = 0; k < this.V; k++) {
      for (i = 0; i < this.V; i++) {
        for (j = 0; j < this.V; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    this.printSolution(dist);
  }

  printSolution(dist) {
    document.write(
      "Following matrix shows the shortest " +
        "distances between every pair of vertices<br>"
    );
    for (const i = 0; i < this.V; ++i) {
      for (const j = 0; j < this.V; ++j) {
        if (dist[i][j] == INF) {
          document.write(" INF ");
        } else {
          document.write("  " + dist[i][j] + " ");
        }
      }

      document.write("<br>");
    }
  }
}