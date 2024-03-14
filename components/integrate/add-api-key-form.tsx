"use client";

function AddApiKeyForm() {
  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
      <button>Create</button>
    </form>
  );
}

export default AddApiKeyForm;
