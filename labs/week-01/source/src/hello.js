const student = {
  name: "ภูมิพัฒน์ วงศ์ดาว",
  studentId: "68543210038-4",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));