import re

css_path = '/workspace/src/index.css'
with open(css_path, 'r') as f:
    css = f.read()

# 1. Fix static stars in body
css = css.replace(
    """url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='20' y='30' width='3' height='3' fill='white' opacity='0.8'/%3E%3Crect x='150' y='80' width='3' height='3' fill='white' opacity='0.6'/%3E%3Crect x='80' y='260' width='3' height='3' fill='white' opacity='0.9'/%3E%3Crect x='250' y='190' width='3' height='3' fill='white' opacity='0.5'/%3E%3Cpath d='M100 40 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.9'/%3E%3Cpath d='M220 220 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.7'/%3E%3C/svg%3E")""",
    """url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='20' y='30' width='3' height='3' fill='white' opacity='0.8'/%3E%3Crect x='150' y='80' width='3' height='3' fill='white' opacity='0.6'/%3E%3Crect x='80' y='60' width='3' height='3' fill='white' opacity='0.9'/%3E%3Crect x='250' y='90' width='3' height='3' fill='white' opacity='0.5'/%3E%3Cpath d='M100 40 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.9'/%3E%3Cpath d='M220 120 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white' opacity='0.7'/%3E%3C/svg%3E")"""
)

# 2. Fix twinkling stars in body::before
css = css.replace(
    """url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='40' y='120' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.1;1;0.1' dur='3s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='180' y='40' width='4' height='4' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='4.5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='280' y='180' width='2' height='2' fill='white'%3E%3Canimate attributeName='opacity' values='0;0.8;0' dur='2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='80' y='280' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.3;1;0.3' dur='3.2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='350' y='90' width='5' height='5' fill='white'%3E%3Canimate attributeName='opacity' values='0.5;1;0.5' dur='5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Cpath d='M150 150 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white'%3E%3Canimate attributeName='opacity' values='0;1;0' dur='2.8s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M250 260 h4 v-4 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 z' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.3;1' dur='6s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M50 350 h2 v-2 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 z' fill='white'%3E%3Canimate attributeName='opacity' values='0.2;0.9;0.2' dur='4s' repeatCount='indefinite' /%3E%3C/path%3E%3C/svg%3E")""",
    """url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='40' y='120' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.1;1;0.1' dur='3s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='180' y='40' width='4' height='4' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.2;1' dur='4.5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='280' y='180' width='2' height='2' fill='white'%3E%3Canimate attributeName='opacity' values='0;0.8;0' dur='2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='80' y='110' width='3' height='3' fill='white'%3E%3Canimate attributeName='opacity' values='0.3;1;0.3' dur='3.2s' repeatCount='indefinite' /%3E%3C/rect%3E%3Crect x='350' y='90' width='5' height='5' fill='white'%3E%3Canimate attributeName='opacity' values='0.5;1;0.5' dur='5s' repeatCount='indefinite' /%3E%3C/rect%3E%3Cpath d='M150 150 h3 v-3 h3 v3 h3 v3 h-3 v3 h-3 v-3 h-3 z' fill='white'%3E%3Canimate attributeName='opacity' values='0;1;0' dur='2.8s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M250 160 h4 v-4 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 z' fill='white'%3E%3Canimate attributeName='opacity' values='1;0.3;1' dur='6s' repeatCount='indefinite' /%3E%3C/path%3E%3Cpath d='M50 70 h2 v-2 h2 v2 h2 v2 h-2 v2 h-2 v-2 h-2 z' fill='white'%3E%3Canimate attributeName='opacity' values='0.2;0.9;0.2' dur='4s' repeatCount='indefinite' /%3E%3C/path%3E%3C/svg%3E")"""
)

with open('/workspace/clouds.txt', 'r') as f:
    clouds_txt = f.read().strip()

c = [x.strip() for x in clouds_txt.split(',\n')]

new_clouds_css = f"""
#root::before {{
  z-index: -1;
  background-image: 
    {c[0]},
    {c[2]},
    {c[4]},
    {c[6]};
  background-size: 
    800px 400px,
    600px 300px,
    900px 400px,
    1100px 300px;
  animation: clouds-fg 70s linear infinite;
  opacity: 0.95;
}}

#root::after {{
  z-index: -2;
  background-image: 
    {c[1]},
    {c[3]},
    {c[5]},
    {c[7]};
  background-size: 
    1200px 350px,
    1400px 300px,
    1000px 350px,
    1300px 350px;
  animation: clouds-bg 110s linear infinite;
  opacity: 0.8;
}}

@keyframes clouds-fg {{
  0% {{
    background-position:
      0px 95%,
      600px 85%,
      0px 75%,
      1100px 65%;
  }}
  100% {{
    background-position:
      800px 95%,
      0px 85%,
      900px 75%,
      0px 65%;
  }}
}}

@keyframes clouds-bg {{
  0% {{
    background-position:
      1200px 80%,
      0px 70%,
      1000px 60%,
      0px 50%;
  }}
  100% {{
    background-position:
      0px 80%,
      1400px 70%,
      0px 60%,
      1300px 50%;
  }}
}}
"""

old_clouds_section = re.compile(r'#root::before[ \s\S]*?@keyframes cloud-scroll-slow[ \s\S]*?\}')
css = old_clouds_section.sub(new_clouds_css.strip(), css)

with open(css_path, 'w') as f:
    f.write(css)

print("Done")
