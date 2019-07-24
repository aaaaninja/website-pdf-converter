FROM node

RUN apt update && apt install -y gdebi-core \
                                 busybox \
                                 fonts-noto \
                                 fonts-noto-cjk \
                                 fonts-noto-hinted \
                                 fonts-noto-mono \
                                 fonts-noto-unhinted \
  && git clone https://github.com/k1nPr45b0/website-pdf-converter.git

WORKDIR website-pdf-converter

COPY .git/index /git_status
RUN yarn
