import { Component } from "react";

class App extends Component {
  state = {
    hour: 0,
    minute: 0,
    second: 0,
    interval: "",
    btnDisabled: false,
    intervalStorage: [],
  };

  startClicked = () => {
    const timer = setInterval(() => {
      const { hour, minute, second } = this.state;
      if (second === 59) {
        if (minute === 59) {
          this.setState({
            hour: hour + 1,
            minute: 0,
            second: 0,
          });
        } else {
          this.setState({
            minute: minute + 1,
            second: 0,
          });
        }
      } else {
        this.setState({
          second: second + 1,
        });
      }
    }, 1000);
    this.setState({
      btnDisabled: true,
      interval: timer,
    });
  };

  stopClicked = () => {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState({
      btnDisabled: false,
    });
  };

  intervalClicked = () => {
    const { hour, minute, second, intervalStorage } = this.state;
    intervalStorage.push(`${hour}:${minute}:${second}`);
    this.setState({
      intervalStorage,
    });
  };

  clearClicked = () => {
    this.stopClicked();
    this.setState({
      hour: 0,
      minute: 0,
      second: 0,
      intervalStorage: [],
    });
  };

  render() {
    const { hour, minute, second, btnDisabled, intervalStorage } = this.state;
    return (
      <div>
        <div className="timer-container">
          <h1 className="">
            <span>Online</span> Stopwatch
          </h1>

          <div className="timer-col">
            <p className="timer-hours">{hour}</p>
            <p className="timer-label">Hours</p>
          </div>

          <div className="timer-col">
            <p className="timer-minutes">{minute}</p>
            <p className="timer-label">Minutes</p>
          </div>

          <div className="timer-col">
            <p className="timer-seconds">{second}</p>
            <p className="timer-label">Seconds</p>
          </div>
        </div>

        <div className="timer-container text-center">
          <div className="timer-btn">
            <button
              className="btn btn-success"
              onClick={this.startClicked}
              disabled={btnDisabled}
            >
              Start
            </button>
          </div>

          <div className="timer-btn">
            <button className="btn btn-danger" onClick={this.stopClicked}>
              Stop
            </button>
          </div>

          <div className="timer-btn">
            <button
              className="btn btn-primary"
              onClick={this.intervalClicked}
              disabled={!btnDisabled}
            >
              Interval
            </button>
          </div>

          <div className="timer-btn">
            <button className="btn btn-warning" onClick={this.clearClicked}>
              Clear
            </button>
          </div>
        </div>

        <div className="timer-container-intervals text-center">
          {intervalStorage.map((item, index) => (
            <p>
              {index + 1} =&gt; {item}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
