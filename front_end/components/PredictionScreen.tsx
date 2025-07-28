import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Calendar, Activity, Zap } from 'lucide-react';

export function PredictionScreen() {
  // Mock prediction data
  const anemiaRiskData = [
    { date: 'Jul 27', current: 8.3, predicted: 8.1, riskLevel: 'medium' },
    { date: 'Aug 3', current: null, predicted: 7.9, riskLevel: 'high' },
    { date: 'Aug 10', current: null, predicted: 7.6, riskLevel: 'high' },
    { date: 'Aug 17', current: null, predicted: 7.4, riskLevel: 'critical' },
    { date: 'Aug 24', current: null, predicted: 7.8, riskLevel: 'high' }, // After predicted transfusion
    { date: 'Aug 31', current: null, predicted: 8.2, riskLevel: 'medium' },
  ];

  const ironOverloadTrend = [
    { month: 'Jul', ferritin: 2520, predicted: 2580 },
    { month: 'Aug', ferritin: null, predicted: 2650 },
    { month: 'Sep', ferritin: null, predicted: 2720 },
    { month: 'Oct', ferritin: null, predicted: 2800 },
    { month: 'Nov', ferritin: null, predicted: 2680 }, // With optimized chelation
    { month: 'Dec', ferritin: null, predicted: 2550 },
  ];

  const bloodRequirementPrediction = [
    { period: 'Next 3 months', units: 12, confidence: 92 },
    { period: 'Next 6 months', units: 24, confidence: 87 },
    { period: 'Next 12 months', units: 48, confidence: 78 },
  ];

  const riskFactors = [
    {
      category: 'Anemia Risk',
      level: 'High',
      score: 78,
      factors: ['Declining Hb trend', 'Time since last transfusion', 'Historical pattern'],
      timeframe: '10-14 days',
      color: 'text-red-600'
    },
    {
      category: 'Iron Overload',
      level: 'Critical',
      score: 85,
      factors: ['Rising ferritin levels', 'Suboptimal chelation', 'Liver enzyme elevation'],
      timeframe: 'Ongoing',
      color: 'text-orange-600'
    },
    {
      category: 'Cardiac Risk',
      level: 'Medium',
      score: 45,
      factors: ['Iron deposition risk', 'Regular monitoring needed'],
      timeframe: '6-12 months',
      color: 'text-yellow-600'
    }
  ];

  const aiRecommendations = [
    {
      title: 'Schedule Blood Transfusion',
      priority: 'High',
      description: 'Based on your hemoglobin trend, schedule a transfusion within the next 10-14 days to prevent severe anemia.',
      action: 'Contact your hematologist',
      confidence: 92
    },
    {
      title: 'Optimize Chelation Therapy',
      priority: 'High',
      description: 'Your ferritin levels are rising. Consider adjusting chelation therapy timing and dosage.',
      action: 'Discuss with your doctor',
      confidence: 88
    },
    {
      title: 'Liver Function Monitoring',
      priority: 'Medium',
      description: 'Regular liver enzyme monitoring recommended due to high iron load and chelation therapy.',
      action: 'Schedule monthly LFTs',
      confidence: 85
    },
    {
      title: 'Dietary Consultation',
      priority: 'Low',
      description: 'Optimize iron absorption timing with meals and chelation for better treatment outcomes.',
      action: 'Meet with nutritionist',
      confidence: 75
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          AI Health Predictions
        </h1>
        <p className="text-muted-foreground">AI-powered insights based on your health data and patterns</p>
      </div>

      {/* High Priority Alerts */}
      <div className="space-y-3">
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Critical Alert:</strong> Hemoglobin levels are predicted to drop to 7.4 g/dL within 3 weeks. 
            Schedule transfusion immediately.
          </AlertDescription>
        </Alert>

        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <TrendingUp className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Warning:</strong> Iron overload is increasing. Ferritin projected to exceed 2800 ng/mL without intervention.
          </AlertDescription>
        </Alert>
      </div>

      {/* Risk Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riskFactors.map((risk, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                {risk.category}
                <Badge 
                  variant={risk.level === 'Critical' ? 'destructive' : risk.level === 'High' ? 'secondary' : 'outline'}
                >
                  {risk.level}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Risk Score</span>
                    <span className={risk.color}>{risk.score}%</span>
                  </div>
                  <Progress value={risk.score} className="h-2" />
                </div>
                
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Key Factors:</p>
                  <ul className="text-xs space-y-1">
                    {risk.factors.map((factor, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-1 border-t border-border">
                  <span className="text-xs text-muted-foreground">Timeframe: {risk.timeframe}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prediction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anemia Risk Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              Anemia Risk Prediction
            </CardTitle>
            <p className="text-sm text-muted-foreground">Hemoglobin level forecast</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={anemiaRiskData}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[6, 9]} />
                  <Tooltip 
                    formatter={(value, name) => [`${value} g/dL`, name === 'current' ? 'Current' : 'Predicted']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="hsl(var(--destructive))" 
                    fillOpacity={1}
                    fill="url(#riskGradient)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Red zones indicate high anemia risk periods
            </div>
          </CardContent>
        </Card>

        {/* Iron Overload Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Iron Overload Forecast
            </CardTitle>
            <p className="text-sm text-muted-foreground">Ferritin level projection</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ironOverloadTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[2400, 2900]} />
                  <Tooltip formatter={(value) => [`${value} ng/mL`, 'Ferritin Level']} />
                  <Line 
                    type="monotone" 
                    dataKey="ferritin" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="hsl(var(--chart-1))" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Dashed line shows predicted trend with optimized treatment
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blood Requirement Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Blood Requirement Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bloodRequirementPrediction.map((prediction, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{prediction.period}</span>
                  <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {prediction.units} units
                </div>
                <div className="text-xs text-muted-foreground">
                  Approximately {Math.round(prediction.units / 4)} transfusions
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            AI Recommendations
          </CardTitle>
          <p className="text-sm text-muted-foreground">Personalized action items based on your health patterns</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={rec.priority === 'High' ? 'destructive' : rec.priority === 'Medium' ? 'secondary' : 'outline'}
                    >
                      {rec.priority} Priority
                    </Badge>
                    <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
                  </div>
                </div>
                
                <h4 className="font-medium mb-1">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">
                    💡 {rec.action}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">AI Generated</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Prediction Model Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium mb-1">Data Sources:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Your historical lab results (24 months)</li>
                <li>• Transfusion patterns &amp; timing</li>
                <li>• Chelation therapy adherence</li>
                <li>• Symptom reports &amp; dietary logs</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Model Accuracy:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Hemoglobin prediction: 89% accuracy</li>
                <li>• Transfusion timing: 92% accuracy</li>
                <li>• Iron overload risk: 85% accuracy</li>
                <li>• Last updated: July 25, 2025</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}