import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function TemperatureChart({ daily }) {
  const data = daily.time.map((date, index) => ({
    date,
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
  }));

  return (
    <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(d) =>
              new Date(d).toLocaleDateString('en-GB', { weekday: 'short' })
            }
          />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="max" stroke="#ff7300" name="Max Temp" />
          <Line type="monotone" dataKey="min" stroke="#007bff" name="Min Temp" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
