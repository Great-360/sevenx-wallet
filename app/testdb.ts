import  db  from "@/src/db/index";
import  { user }  from "@/src/db/schema";

async function testDB() {
  const allUsers = await db.select().from(user);
  console.log(allUsers);
}

testDB();
