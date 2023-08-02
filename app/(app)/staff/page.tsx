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
    office: "W Mitchel St. and S West St, Office #305F",
    role: "Assistant Dean for Simulation and Technology",
    imageUrl:
      "https://cdn.web.uta.edu/-/media/project/website/conhi/images/people/headshots-128x128/roye_jennifer_headshot_128px.ashx?revision=a7a57753-21f2-4db2-ac50-e4baf7df7473",
    lastSeen: null,
    phone: "817-272-0022",
  },
];

export default function StaffPage() {
  return (
    <> 
      <header className="bg-orange-500 h-20">
        <h1 className="text-white text-2xl lg:px-5 py-6"> 
          Personnel
        </h1> 
      </header>
      <div className="container min-w-full mx-8 my-8 py-16 lg:px-16 items-center justify-center">
        <ul role="list" className="divide-y divide-gray-100">
          {people.map((person) => (
            <li key={person.email} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <img
                  className="h-24 w-24 flex-none rounded-full bg-gray-50"
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
                  <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-red-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Offline</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
