export const libraryDemoEn = {
  search: {
    placeholder: "Search files...",
  },
  upload: {
    button: "Upload Files",
    dragDrop: "Drag and drop files here",
  },
  fileTypes: {
    pdf: "PDF Document",
    doc: "Word Document",
    video: "Video Recording",
    audio: "Audio Recording",
    image: "Image",
  },
  actions: {
    download: "Download",
    share: "Share",
    delete: "Delete",
  },
  preview: {
    aiInsights: "AI Insights",
    summary: "Summary",
    keyPoints: "Key Points",
    fileInfo: "File Information",
  },
  filters: {
    all: 'All Files',
    evidence: 'Evidence',
    documents: 'Documents',
    media: 'Media',
    transcripts: 'Transcripts'
  },
  demoFiles: [
    {
      id: "1",
      name: "Witness Statement - John Doe.pdf",
      type: "pdf",
      case: "2024-001",
      size: "2.4 MB",
      lastModified: "2024-03-15",
      tags: ["evidence", "draft"],
      contentPreview: {
        text: "On March 1st, 2024, during the department meeting..."
      },
      aiSummary: {
        summary: "Witness statement detailing workplace discrimination incidents between January and March 2024. Key testimony supports claims of unfair treatment and hostile work environment.",
        keyPoints: [
          "Multiple instances of discriminatory comments documented",
          "Pattern of being excluded from team meetings",
          "Denied promotion despite meeting qualifications",
          "Documented complaints to HR with no resolution"
        ]
      },
      relatedFiles: [
        {
          id: "2",
          name: "HR Complaint Form.pdf",
          relevance: 0.95
        },
        {
          id: "3",
          name: "Performance Review 2023.pdf",
          relevance: 0.85
        }
      ]
    },
    // Add more demo files following the same structure
  ]
} as const; 