import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function InstitutionalContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    toast({
      title: "Form Submitted",
      description: "We've received your message and will get back to you soon.",
    })
    // Reset form after submission
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-[600px] overflow-y-auto border border-[#FF6521]/20">
      <h2 className="text-2xl font-bold mb-4 text-[#FF6521]">Institutional Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 bg-gray-800 text-white border-[#FF6521]/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 bg-gray-800 text-white border-[#FF6521]/20"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300">
            Company
          </label>
          <Input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="mt-1 bg-gray-800 text-white border-[#FF6521]/20"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 bg-gray-800 text-white border-[#FF6521]/20"
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full bg-[#FF6521] hover:bg-[#FF6521]/90 text-white">
          Submit
        </Button>
      </form>
    </div>
  )
}

