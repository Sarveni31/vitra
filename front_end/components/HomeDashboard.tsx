import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Droplets, Calendar, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function HomeDashboard() {
  // Mock data for hemoglobin levels over time
  const hemoglobinData = [
    { date: 'Jan 15', value: 8.2, normal: 12 },
    { date: 'Feb 12', value: 7.9, normal: 12 },
    { date: 'Mar 10', value: 8.5, normal: 12 },
    { date: 'Apr 8', value: 8.1, normal: 12 },
    { date: 'May 6', value: 7.8, normal: 12 },
    { date: 'Jun 3', value: 8.3, normal: 12 },
  ];

  // Mock data for ferritin trends
  const ferritinData = [
    { month: 'Jan', ferritin: 2100 },
    { month: 'Feb', ferritin: 2350 },
    { month: 'Mar', ferritin: 2200 },
    { month: 'Apr', ferritin: 2450 },
    { month: 'May', ferritin: 2380 },
    { month: 'Jun', ferritin: 2520 },
  ];

  const currentHemoglobin = 8.3;
  const currentFerritin = 2520;
  const nextTransfusionDays = 12;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1>Welcome back, Sarah</h1>
        <p className="text-muted-foreground">Here's your latest health overview</p>
      </div>

      {/* Alert for upcoming transfusion */}
      <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
        <Calendar className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          Your next transfusion is predicted in {nextTransfusionDays} days. Please schedule your appointment.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Hemoglobin</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{currentHemoglobin} g/dL</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="destructive" className="text-xs">Below Normal</Badge>
              <span className="text-xs text-muted-foreground">Normal: 12-16 g/dL</span>
            </div>
            <Progress value={(currentHemoglobin / 16) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serum Ferritin</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{currentFerritin.toLocaleString()} ng/mL</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">+5.8% from last month</span>
            </div>
            <Badge variant="secondary" className="mt-2 text-xs">High Iron Load</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Transfusion</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{nextTransfusionDays} days</div>
            <p className="text-xs text-muted-foreground mt-2">
              Predicted based on your Hb trends
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs text-yellow-600">
              <AlertCircle className="h-3 w-3" />
              Schedule appointment soon
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hemoglobin Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Hemoglobin Levels</CardTitle>
            <p className="text-sm text-muted-foreground">Last 6 measurements</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hemoglobinData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[6, 14]} />
                  <Tooltip 
                    formatter={(value, name) => [`${value} g/dL`, name === 'value' ? 'Your Level' : 'Normal Range']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="normal" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ferritin Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Ferritin Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly iron load monitoring</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ferritinData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ng/mL`, 'Ferritin Level']} />
                  <Bar 
                    dataKey="ferritin" 
                    fill="hsl(var(--chart-1))"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Blood test completed</p>
                  <p className="text-xs text-muted-foreground">June 3, 2025 - Dr. Johnson</p>
                </div>
              </div>
              <Badge variant="secondary">Complete</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Chelation therapy</p>
                  <p className="text-xs text-muted-foreground">Daily - Deferasirox 500mg</p>
                </div>
              </div>
              <Badge variant="outline">Ongoing</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Transfusion scheduled</p>
                  <p className="text-xs text-muted-foreground">July 15, 2025 - City Hospital</p>
                </div>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}