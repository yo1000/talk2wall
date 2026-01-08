import Navigation from "@/components/Navigation";
import Search from "@/components/Search";
import {revision} from "@/lib/revision";

export default function Header({tags}: {tags: {tag: string, count: number}[] | undefined}) {
  return (
    <header>
      <Navigation tags={tags}/>
      <Search rev={revision}/>
    </header>
  );
}
