import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useListContact } from "@/hooks/api";
import { formatAddress } from "@/lib/utils";
import { ChevronLeft, Copy, LoaderCircle, Plus } from "lucide-react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { match } from "ts-pattern";

const Contact = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["id"]);
  const userId = cookies?.id;
  const [contact, setName, setTag] = useListContact(userId);
  return (
    <main className="flex justify-center items-center w-full p-2">
      <div className="w-[440px] h-[600px] p-2 text-white font-space border border-white">
        <div className="flex gap-2 items-center">
          <ChevronLeft
            onClick={() => navigate(-1)}
            className="w-10 h-10 cursor-pointer"
          />
          <p className="font-bold text-xl flex justify-between w-full">
            Send{" "}
            <Link to="/addcontact" className="">
              <Plus className="rounded-full hover:bg-white/20" />
            </Link>
          </p>
        </div>
        <div className="p-2">
          <Input
            className="h-5 w-48 placeholder:text-xs p-1"
            placeholder="Filter by name or tags"
            onChange={(event) => {
              event.preventDefault();
              setName(event.target.value);
              setTag(event.target.value);
            }}
          />
        </div>
        <div>
          {contact.isFetching && <LoaderCircle className="animate-spin" />}
          {match(contact.data?.length)
            .with(0, () => (
              <div className="text-xs text-center flex items-center justify-center flex-col h-[200px]">
                <p> No Contacts Saved</p>
                <p>Hit the + to add a new contact</p>
              </div>
            ))
            .otherwise(() => (
              <div className="p-2 text-sm">
                {contact?.data?.map((c) => (
                  <div
                    key={c.id}
                    onClick={() =>
                      navigate("/send", {
                        state: { walletAddress: c.walletAddress },
                      })
                    }
                    className="cursor-pointer hover:bg-white/20 p-1 mx-1 rounded-md drop-shadow-md flex justify-between items-center"
                  >
                    <p>{c.name}</p>
                    <div className="flex gap-1">
                      {c.tags.slice(0, 2).map((t) => (
                        <Badge
                          key={t}
                          className="h-3 text-[10px] cursor-pointer"
                          variant={"secondary"}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] flex items-center gap-1">
                        <Copy
                          className="w-3 h-3 cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(c.walletAddress)
                          }
                        />
                        {formatAddress(c.walletAddress)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Contact;
