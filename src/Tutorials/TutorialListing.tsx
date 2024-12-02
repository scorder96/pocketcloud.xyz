import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface Props {
  title: string;
  tag: string;
  description: string;
  date: string;
}
export default function TutorialListing({ title, tag, description, date }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{tag}</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <span className="text-sm font-light">{date}</span>
      </CardFooter>
    </Card>
  );
}
