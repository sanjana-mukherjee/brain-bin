function UnorderedList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-3 list-[revert] pl-8 marker:text-lime-300">{children}</ul>
  );
}

function OrderedList({ children }: { children: React.ReactNode }) {
  return (
    <ol className="my-3 list-[revert] pl-8 marker:text-lime-300 [&>li]:pl-2">
      {children}
    </ol>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="mt-1.5">{children}</li>;
}

export const listComponents = {
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
};
