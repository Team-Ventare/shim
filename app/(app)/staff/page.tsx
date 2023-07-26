const people = [
  {
    name: "Jacquelyn Donaldson",
    email: "jacquelyn.donaldson@uta.edu",
    office: "UH 530C",
    role: "Simulation Inventory Spec.",
    imageUrl:
      "https://cdn.web.uta.edu/-/media/project/website/conhi/images/people/headshots-128x128/jackie_donaldson.ashx?revision=d5a8f237-2ca8-4082-9f03-0a6f95b53681",
    lastSeen: null,
    phone: "817-272-9430",
  },
  {
    name: "Karen Caddell",
    email: "kcaddell@uta.edu",
    office: "UH 549",
    role: "Administrative Assistant",
    imageUrl:
      "https://cdn.web.uta.edu/-/media/project/website/conhi/images/people/headshots-128x128/karen_caddell.ashx?revision=23a9d179-05a9-457d-9a48-44f495e90d85",
    lastSeen: null,
    phone: "817-272-9420"
  },
  {
    name: "Jennifer Roye, MSN, RN, CHSE, CNE",
    email: "roye@uta.edu",
    role: "Assistant Dean for Simulation and Technology",
    imageUrl:
      "https://cdn.web.uta.edu/-/media/project/website/conhi/images/people/headshots-128x128/roye_jennifer_headshot_128px.ashx?revision=a7a57753-21f2-4db2-ac50-e4baf7df7473",
    lastSeen: null,
  },
];

export default function StaffPage() {
  return (
    <div className="container mx-auto my-16 py-16 lg:px-32 items-center justify-center">
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.imageUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen{" "}
                  <time dateTime={person.lastSeen}>
                    {person.lastSeen}
                  </time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
