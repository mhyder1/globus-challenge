function App() {
  dayjs.extend(window.dayjs_plugin_relativeTime);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetch("http://localhost:3000/api/1", { headers: { "api-key": "globus" } })
      .then((res) => res.json())
      .then(({ DATA }) => setData(DATA))
      .catch((error) => setError(error.toString()));
  }, []);

  function format(date) {
    return dayjs(date).isValid()
      ? dayjs(date).format("MM/DD/YYYY hh:mm A")
      : "Unknown";
  }

  function getStatus(start_date, end_date, total, processed, remaining) {
    switch (true) {
      case start_date && !end_date && total !== processed:
        return `Time remaining: ${dayjs(
          new Date().getTime() + remaining
        ).fromNow(true)}`;
      case start_date && end_date && total !== processed:
        return `Halted: ${format(end_date)}`;
      case start_date && end_date && total === processed:
        return `Completed: ${format(end_date)}`;
      case !start_date:
        return "not started";
      default:
        return "";
    }
  }

  function getProgress(progress) {
    switch (true) {
      case progress < 1000:
        return `${progress} b`;
      case progress >= 1000 && progress < 1_000_000:
        return `${Number(progress / 1000).toFixed(2)} kB`;
      case progress >= 1_000_000 && progress < 1_000_000_000:
        return `${Number(progress / 1_000_000).toFixed(2)} MB`;
      case progress >= 1_000_000_000:
        return `${Number(progress / 1_000_000_000).toFixed(2)} GB`;
      default:
        return "0";
    }
  }

  function niceStatus(status) {
    const match = status.match(/\b(success|fail|error)(|.+?)\b/gi);
    if (!match) return;
    return status.split(" ").map((word, index) => {
      return word.toLowerCase().includes(match[0].toLowerCase()) ? (
        <strong key={index}>{`${word} `}</strong>
      ) : (
        `${word} `
      );
    });
  }

  return (
    <>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>status</th>
              <th>progress</th>
              <th>user</th>
              <th>request date</th>
            </tr>
            {data.map(
              ({
                id,
                status,
                processed,
                total,
                fullname,
                request_date,
                email,
                start_date,
                end_date,
                remaining,
              }) => (
                <React.Fragment key={id}>
                  <tr key={id}>
                    <td>
                      <p>
                        {getStatus(
                          start_date,
                          end_date,
                          total,
                          processed,
                          remaining
                        )}
                      </p>
                      <p>{niceStatus(status)}</p>
                    </td>
                    <td>{`${getProgress(processed)}/${getProgress(total)}`}</td>
                    <td>
                      <a href={`mailto:${email}`} target="_blank">
                        {fullname}
                      </a>
                    </td>
                    <td>{format(request_date)}</td>
                  </tr>
                </React.Fragment>
              )
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
