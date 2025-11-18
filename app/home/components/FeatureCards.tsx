import { Zap, Code, BarChart3, Boxes } from 'lucide-react'

interface Feature {
  title: string
  description: string
}

interface FeatureCardsProps {
  features: Feature[]
}

const iconMap: { [key: string]: any } = {
  'Comprehensive': Boxes,
  'Easy': Zap,
  'Benchmark': BarChart3,
  'Extensible': Code,
}

export default function FeatureCards({ features }: FeatureCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        // Try to match icon based on title keywords
        let Icon = Zap
        for (const [keyword, IconComponent] of Object.entries(iconMap)) {
          if (feature.title.includes(keyword)) {
            Icon = IconComponent
            break
          }
        }

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-primary-light/30 p-6"
          >
            <div className="mb-4 text-primary">
              <Icon size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}
