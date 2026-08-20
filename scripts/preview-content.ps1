<#
.SYNOPSIS
  Chuyen 1 file JSON (content/wiki hoac content/wiki-hub) thanh Markdown nhap chuan
  (frontmatter + body) theo dung format o .agents/rules/seo-formatting-markdown.md.
  Dung de:
    - Doc nhanh 1 bai JSON cho de mat (khong OutDir -> in ra console).
    - Khoi tao ban nhap .md khi /seo-optimize audit 1 bai da publish
      (OutDir knowledge/4-content/2-draft).
  Day la chieu JSON -> Markdown. Chieu nguoc lai (Markdown -> JSON, o buoc /approve
  publish) do agent thuc hien thu cong theo dung rule, KHONG co script tu dong.

.USAGE
  ./scripts/preview-content.ps1 -Path content/wiki/benh-heo-xanh-heo-vang.json
  ./scripts/preview-content.ps1 -Path content/wiki/benh-heo-xanh-heo-vang.json -OutDir knowledge/4-content/2-draft
  ./scripts/preview-content.ps1 -Path content/wiki -OutDir knowledge/4-content/2-draft
#>
param(
  [Parameter(Mandatory = $true)]
  [string]$Path,
  [string]$OutDir
)

function ConvertTo-YamlScalar {
  param([string]$Value)
  if ($Value -match '[:#\[\]\{\}"''`]') {
    return '"' + ($Value -replace '"', '\"') + '"'
  }
  return $Value
}

function Convert-ArticleToMarkdown {
  param($Article)

  $isHub = [bool]$Article.herbSlug
  $fm = New-Object System.Collections.Generic.List[string]
  $fm.Add("---")
  $fm.Add("id: $($Article.id)")
  $fm.Add("slug: $($Article.slug)")
  if ($isHub) {
    $fm.Add("herbSlug: $($Article.herbSlug)")
    $fm.Add("herbName: $($Article.herbName)")
  }
  $fm.Add("title: $(ConvertTo-YamlScalar $Article.title)")
  if ($Article.seoTitle) { $fm.Add("seoTitle: $(ConvertTo-YamlScalar $Article.seoTitle)") }
  if (-not $isHub) {
    $fm.Add("category: $($Article.category)")
    $fm.Add("author: $($Article.author)")
    $fm.Add("readTime: $($Article.readTime)")
    $fm.Add("date: $($Article.date)")
    $fm.Add("excerpt: $(ConvertTo-YamlScalar $Article.excerpt)")
    $fm.Add("image: $($Article.image)")
    if ($Article.standardsTableTitle) { $fm.Add("standardsTableTitle: $(ConvertTo-YamlScalar $Article.standardsTableTitle)") }
    if ($Article.standardsTableHeaders) {
      $headers = ($Article.standardsTableHeaders | ForEach-Object { '"' + $_ + '"' }) -join ", "
      $fm.Add("standardsTableHeaders: [$headers]")
    }
  }
  $fm.Add("---")

  $lines = New-Object System.Collections.Generic.List[string]
  $lines.AddRange($fm)
  $lines.Add("")

  if ($isHub) {
    $lines.Add("## Giới thiệu")
    $lines.Add("")
    $lines.Add($Article.intro)

    if ($Article.standards) {
      $lines.Add("")
      $lines.Add("## Tiêu chuẩn theo giai đoạn")
      $lines.Add("")
      $lines.Add("| Giai đoạn | Tiêu chí | Cách kiểm soát |")
      $lines.Add("|---|---|---|")
      foreach ($row in $Article.standards) {
        $lines.Add("| $($row.stage) | $($row.criteria) | $($row.controlMethod) |")
      }
    }

    if ($Article.pests) {
      $lines.Add("")
      $lines.Add("## Sâu bệnh")
      $lines.Add("")
      foreach ($pest in $Article.pests) {
        $lines.Add("- **$($pest.pestName)**: $($pest.symptoms) → $($pest.remedy)")
      }
    }
  } else {
    foreach ($section in $Article.contentSections) {
      $lines.Add("## $($section.heading)")
      $lines.Add("")
      for ($i = 0; $i -lt $section.paragraphs.Count; $i++) {
        $lines.Add($section.paragraphs[$i])
        $lines.Add("")
      }
      if ($section.highlight) {
        $lines.Add("> HIGHLIGHT: $($section.highlight)")
        $lines.Add("")
      }
    }

    if ($Article.standardsTable) {
      $title = if ($Article.standardsTableTitle) { $Article.standardsTableTitle } else { "" }
      $lines.Add("## Bảng: $title")
      $lines.Add("")
      $headers = if ($Article.standardsTableHeaders) { $Article.standardsTableHeaders } else { @("Yếu tố", "Tiêu chuẩn", "Ghi chú") }
      $lines.Add("| $($headers[0]) | $($headers[1]) | $($headers[2]) |")
      $lines.Add("|---|---|---|")
      foreach ($row in $Article.standardsTable) {
        $lines.Add("| $($row.factor) | $($row.standard) | $($row.notes) |")
      }
      $lines.Add("")
    }

    if ($Article.pitfall) {
      $lines.Add("## Sai lầm phổ biến")
      $lines.Add("")
      if ($Article.pitfall.title) {
        $lines.Add("**Tiêu đề:** $($Article.pitfall.title)")
      }
      $lines.Add($Article.pitfall.body)
      $lines.Add("")
    }
  }

  if ($Article.faq) {
    $lines.Add("## FAQ")
    $lines.Add("")
    foreach ($f in $Article.faq) {
      $lines.Add("**Q: $($f.question)**")
      $lines.Add("A: $($f.answer)")
      $lines.Add("")
    }
  }

  return ($lines -join "`n").TrimEnd() + "`n"
}

$targets = @()
if (Test-Path $Path -PathType Container) {
  $targets = Get-ChildItem -Path $Path -Filter *.json -File
} else {
  $targets = Get-Item $Path
}

if ($OutDir -and -not (Test-Path $OutDir)) {
  New-Item -ItemType Directory -Path $OutDir | Out-Null
}

foreach ($file in $targets) {
  $json = Get-Content -Path $file.FullName -Raw -Encoding UTF8 | ConvertFrom-Json
  $md = Convert-ArticleToMarkdown -Article $json

  if ($OutDir) {
    $outPath = Join-Path $OutDir ($file.BaseName + ".md")
    $md | Out-File -FilePath $outPath -Encoding utf8 -NoNewline
    Write-Host "Da xuat: $outPath"
  } else {
    Write-Host $md
    Write-Host "`n============================================================`n"
  }
}
