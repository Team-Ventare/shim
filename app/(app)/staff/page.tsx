import { AcademicCapIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const people = [
  {
    name: "Jacquelyn Donaldson",
    email: "jacquelyn.donaldson@uta.edu",
    office: "UH 530C",
    role: "Simulation Inventory Spec.",
    imageUrl:
      "https://cdn.web.uta.edu/-/media/project/website/conhi/images/people/headshots-128x128/jackie_donaldson.ashx?revision=d5a8f237-2ca8-4082-9f03-0a6f95b53681",
    phone: "817-272-9430",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Karen Caddell",
    email: "kcaddell@uta.edu",
    office: "UH 549",
    role: "Administrative Assistant",
    imageUrl:
      "https://cdn.web.uta.edu/-/media/project/website/conhi/images/people/headshots-128x128/karen_caddell.ashx?revision=23a9d179-05a9-457d-9a48-44f495e90d85",

    phone: "817-272-9420",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Jennifer Roye, MSN, RN, CHSE, CNE",
    email: "roye@uta.edu",
    office: "W Mitchel St. and S West St, Office #305F",
    role: "Assistant Dean for Simulation and Technology",
    imageUrl:
      "https://cdn.web.uta.edu/-/media/project/website/conhi/images/people/headshots-128x128/roye_jennifer_headshot_128px.ashx?revision=a7a57753-21f2-4db2-ac50-e4baf7df7473",
    phone: "817-272-0022",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function StaffPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="sm:flex sm:items-center py-2">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            About the team
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            We are a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
      </div>
      <div className="my-8 lg:my-12">
        <ul
          role="list"
          className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3 max-w-4xl"
        >
          {people.map((person) => (
            <li
              key={person.name}
              className="flex flex-col gap-10 pt-12 sm:flex-row"
            >
              <img
                className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                src={person.imageUrl}
                alt=""
              />
              <div className="max-w-4xl flex-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                    <a href={"mailto:" + person.email}><p className="text-base leading-7 text-gray-600">
                      {person.email}
                    </p></a>
                  </div>
                </div>
                <div className="sm:flex sm:items-center sm:justify-between">
                  <p className="text-base leading-7 text-gray-600">
                    {person.role}
                  </p>
                  <div className="flex items-center space-x-2">
                    <AcademicCapIcon className="h-5 w-5 text-gray-600" />
                    <p className="text-base leading-7 text-gray-600">
                      {person.office}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {person.bio}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
