import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Flame, Hourglass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TransitionLink from '@/components/TransitionLink'
import { CardRecipeProps } from './types'
import { cn } from '@/lib/utils'

const InfoRow: React.FC<{
  icon: React.ElementType
  text: string
  className?: string
  iconClassName?: string
}> = ({ icon: Icon, text, className, iconClassName }) => (
  <div className={cn('flex items-center space-x-2 px-6', className)}>
    <Icon className={cn('w-4 h-4 text-custom', iconClassName)} />
    <span>{text}</span>
  </div>
)

export default function CardRecipe({ recipe }: CardRecipeProps) {
  const { slug, type, license, images, title, difficulty, prepTime, desc } =
    recipe

  return (
    <Card className="max-w-92 border-2 border-black flex flex-col" key={slug}>
      <CardHeader className="relative p-0">
        <div className="w-full flex justify-end flex-wrap gap-2 absolute right-0 top-0 p-6">
          <Badge className={`border-2 border-black`}>{type}</Badge>
          <Badge className={`border-2 border-black bg-white`} variant="outline">
            {license}
          </Badge>
        </div>
        <Image
          src={images[0] || 'https://picsum.photos/300/300'}
          alt={title}
          width={200}
          height={200}
          className="w-full h-auto mb-3 object-cover max-h-48 !mt-0 rounded-t-lg"
        />
        <CardTitle className="p-6 pb-3 font-bold text-xl">{title}</CardTitle>
        {difficulty && (
          <InfoRow
            icon={Flame}
            text={`Difficulté: ${difficulty}`}
            iconClassName="text-red-500"
          />
        )}
        {prepTime && (
          <InfoRow
            icon={Hourglass}
            text={`Temps de preparation: ${prepTime}`}
          />
        )}
      </CardHeader>
      <CardContent className="h-full mt-6">
        <CardDescription className="line-clamp-3">{desc}</CardDescription>
      </CardContent>
      <CardFooter className="flex">
        <Button className="w-full text-md px-4 py-6 rounded-xl" asChild>
          <TransitionLink href={`/recette/${slug}`}>
            Voir la recette
          </TransitionLink>
        </Button>
      </CardFooter>
    </Card>
  )
}
