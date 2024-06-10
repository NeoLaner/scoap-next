import { useInstanceData } from "~/app/_hooks/useInstanceData";

function TitleLayout() {
  const { instanceData } = useInstanceData();

  return (
    <div>
      {instanceData?.name} S{instanceData?.season}E{instanceData?.episode}
    </div>
  );
}

export default TitleLayout;
