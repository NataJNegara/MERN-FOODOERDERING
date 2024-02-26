import Filter from "../../components/Filter/Filter";
import { capitalizeFirst } from "../../helper/helper";
import { useTags } from "../home/useTags";

export default function FoodsOperation() {
  const { tags } = useTags();

  let tagsOptions = [];

  for (let i = 0; i < tags?.length; i++) {
    const option = {
      value: tags[i].name,
      label:
        capitalizeFirst(tags[i].name.replace("-", " ")) + ` (${tags[i].count})`,
    };
    tagsOptions.push(option);
  }

  return (
    <div>
      <Filter filterField="tags" options={tagsOptions} />
    </div>
  );
}
